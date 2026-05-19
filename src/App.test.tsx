import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('./services/aiService', () => ({
  generateBucketFromPrompt: vi.fn(),
  AiServiceError: class AiServiceError extends Error {},
}));

import App from './App';
import { generateBucketFromPrompt } from './services/aiService';

beforeEach(() => {
  // jsdomissa ei ole scrollIntoView natiivina, joten mokataan se no-opiksi
  Element.prototype.scrollIntoView = vi.fn();
  vi.mocked(generateBucketFromPrompt).mockReset();
});

describe('App: AI-generointi ja bucketName', () => {
  test('AI-generoidun ämpärin checkoutissa ei näy edellisen preset-ämpärin nimeä', async () => {
    vi.mocked(generateBucketFromPrompt).mockResolvedValue(['u4', 'u8', 'h1', 'h3']);
    const user = userEvent.setup();

    render(<App />);

    // 1. Käyttäjä valitsee Festariämpäri-presetin (ensimmäinen "Valitse tämä")
    const valitseNapit = screen.getAllByRole('button', { name: /Valitse tämä/i });
    await user.click(valitseNapit[0]);

    // 2. Käyttäjä siirtyy ÄmpäriApurille, kirjoittaa ja generoi
    const textarea = screen.getByLabelText(/Kuvaile ämpärisi/i);
    await user.type(textarea, 'pikku ämpäri kavereille');
    const luoNappi = screen.getByRole('button', { name: /Luo ämpäri/i });
    await user.click(luoNappi);

    // 3. AiResultSection renderöityy → klikkaa "Siirry kassalle"
    const kassalleNappi = await screen.findByRole('button', { name: /Siirry kassalle/i });
    await user.click(kassalleNappi);

    // 4. CheckoutView näyttää bucketName vain jos != 'Oma ämpäri'.
    //    Jos bucketName resetoituu oikein, "Festariämpäri" ei saa näkyä missään.
    expect(screen.queryByText('Festariämpäri')).not.toBeInTheDocument();
  });
});
