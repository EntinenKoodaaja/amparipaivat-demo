import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header: navigaatiolinkit', () => {
  test('"Rakenna oma" -linkki ohjaa rakennusosioon (#rakenna), ei #ai', () => {
    render(<Header />);

    const link = screen.getByRole('link', { name: /Rakenna oma/i });
    expect(link).toHaveAttribute('href', '#rakenna');
  });

  test('"Valmiit ämpärit" -linkki ohjaa preset-osioon (#valmiit)', () => {
    render(<Header />);

    const link = screen.getByRole('link', { name: /Valmiit ämpärit/i });
    expect(link).toHaveAttribute('href', '#valmiit');
  });
});
