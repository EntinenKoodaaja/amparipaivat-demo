import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Mock framer-motion — animations don't run in jsdom
vi.mock('framer-motion', async () => {
  const { createElement, Fragment } = await import('react');
  return {
    motion: new Proxy({} as Record<string, any>, {
      get(_, tag: string) {
        return function MotionEl({ children, variants, initial, animate, exit, whileTap, whileHover, transition, ...props }: any) {
          return createElement(tag as any, props, children);
        };
      },
    }),
    AnimatePresence: ({ children }: { children: any }) => createElement(Fragment, null, children),
  };
});

import CheckoutView from '../components/CheckoutView';
import { products } from '../data/products';

const twoProducts = products.slice(0, 2);   // < 5 → bucket costs 3,99 €
const fiveProducts = products.slice(0, 5);  // ≥ 5 → bucket is free

describe('CheckoutView — Loppusumma section', () => {
  test('shows a separate ämpäri cost row (3,99 €) when fewer than 5 products are selected', () => {
    render(
      <CheckoutView selectedProducts={twoProducts} bucketName="Oma ämpäri" onBack={() => {}} />,
    );
    const bucketRow = screen.getByTestId('summary-bucket-cost');
    expect(bucketRow).toHaveTextContent('3,99');
  });

  test('shows "Ilmainen" for ämpäri cost when 5 or more products are selected', () => {
    render(
      <CheckoutView selectedProducts={fiveProducts} bucketName="Oma ämpäri" onBack={() => {}} />,
    );
    const bucketRow = screen.getByTestId('summary-bucket-cost');
    expect(bucketRow).toHaveTextContent('Ilmainen');
  });

  test('grandTotal includes bucket cost even when it is not shown as a line item (regression)', () => {
    render(
      <CheckoutView selectedProducts={twoProducts} bucketName="Oma ämpäri" onBack={() => {}} />,
    );
    const productsTotal = twoProducts.reduce((sum, p) => sum + p.hinta, 0);
    const expected = (productsTotal + 3.99).toFixed(2).replace('.', ',') + ' €';
    expect(screen.getByText(expected)).toBeInTheDocument();
  });
});
