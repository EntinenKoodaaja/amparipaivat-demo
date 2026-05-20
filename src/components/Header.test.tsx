import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header: navigaatiolinkit', () => {
  test('"Ämpäriapuri" -linkki ohjaa aina näkyvissä olevaan AI-osioon (#ai)', () => {
    render(<Header />);

    const link = screen.getByRole('link', { name: /Ämpäriapuri/i });
    expect(link).toHaveAttribute('href', '#ai');
  });

  test('"Valmiit ämpärit" -linkki ohjaa preset-osioon (#valmiit)', () => {
    render(<Header />);

    const link = screen.getByRole('link', { name: /Valmiit ämpärit/i });
    expect(link).toHaveAttribute('href', '#valmiit');
  });
});
