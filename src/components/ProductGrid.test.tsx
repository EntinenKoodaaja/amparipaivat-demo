import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';

describe('ProductGrid: 8 tuotteen rajan palaute', () => {
  test('näyttää selittävän viestin kun isFull on true', () => {
    render(<ProductGrid selected={new Set()} onToggle={() => {}} isFull />);

    // Viestin pitää sisältää selitys: ämpäri täynnä / maksimi / vastaava
    expect(screen.getByText(/täynnä|maksimi/i)).toBeInTheDocument();
  });

  test('ei näytä viestiä kun isFull on false', () => {
    render(<ProductGrid selected={new Set()} onToggle={() => {}} isFull={false} />);

    expect(screen.queryByText(/täynnä|maksimi/i)).not.toBeInTheDocument();
  });

  test('viesti on merkitty live-regioniksi ruudunlukijoita varten', () => {
    render(<ProductGrid selected={new Set()} onToggle={() => {}} isFull />);

    // role="status" tekee siitä live-regionin (aria-live="polite" implisiittisesti)
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
  });
});
