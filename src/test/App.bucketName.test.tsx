import { render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';

// vi.hoisted ensures these are available inside vi.mock factories
const callbacks = vi.hoisted(() => ({
  onAiResult: undefined as ((ids: string[]) => void) | undefined,
  onPresetSelect: undefined as ((ids: string[]) => void) | undefined,
  onAiCheckout: undefined as (() => void) | undefined,
}));

vi.mock('../components/Header', () => ({ default: () => React.createElement('div') }));
vi.mock('../components/Hero', () => ({ default: () => React.createElement('div') }));
vi.mock('../components/ScrollVideoTransition', () => ({ default: () => React.createElement('div') }));
vi.mock('../components/BucketBuilder', () => ({ default: () => React.createElement('div') }));

vi.mock('../components/PresetBuckets', () => ({
  default: ({ onSelect }: { onSelect: (ids: string[]) => void }) => {
    callbacks.onPresetSelect = onSelect;
    return React.createElement('div', { 'data-testid': 'preset-buckets' });
  },
}));

vi.mock('../components/AiBucketGenerator', () => ({
  default: ({ onResult }: { onResult: (ids: string[]) => void }) => {
    callbacks.onAiResult = onResult;
    return React.createElement('div', { 'data-testid': 'ai-generator' });
  },
}));

vi.mock('../components/AiResultSection', () => ({
  default: ({ onCheckout }: { onCheckout: () => void }) => {
    callbacks.onAiCheckout = onCheckout;
    return React.createElement(
      'button',
      { 'data-testid': 'ai-checkout', onClick: onCheckout },
      'Checkout',
    );
  },
}));

vi.mock('../components/CheckoutView', () => ({
  default: ({ bucketName }: { bucketName: string; onBack: () => void; selectedProducts: any[] }) =>
    React.createElement('div', { 'data-testid': 'checkout-view', 'data-bucket-name': bucketName }),
}));

import App from '../App';

// Festariämpäri product IDs from presetBuckets.ts
const FESTARI_IDS = ['u4', 'u8', 'h1', 'h3', 'h6', 'r1', 'r7', 'v1', 'v2'];

describe('App — bucketName reset after AI result', () => {
  beforeEach(() => {
    callbacks.onAiResult = undefined;
    callbacks.onPresetSelect = undefined;
    callbacks.onAiCheckout = undefined;
  });

  test('resets bucketName to "Oma ämpäri" when AI generates a result, even after a preset was selected', () => {
    render(<App />);

    // 1. Select preset → sets bucketName to 'Festariämpäri'
    act(() => {
      callbacks.onPresetSelect?.(FESTARI_IDS);
    });

    // 2. AI returns a result → should reset bucketName to 'Oma ämpäri'
    act(() => {
      callbacks.onAiResult?.(['u1', 'u2']);
    });

    // 3. Proceed to checkout via AiResultSection
    act(() => {
      callbacks.onAiCheckout?.();
    });

    // 4. CheckoutView must receive 'Oma ämpäri', not 'Festariämpäri'
    const checkoutView = screen.getByTestId('checkout-view');
    expect(checkoutView).toHaveAttribute('data-bucket-name', 'Oma ämpäri');
  });
});
