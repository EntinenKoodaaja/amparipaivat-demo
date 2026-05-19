import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import ScrollVideoTransition from './ScrollVideoTransition';

describe('ScrollVideoTransition: prefers-reduced-motion', () => {
  let observerCallback: IntersectionObserverCallback | null = null;
  let playMock: ReturnType<typeof vi.fn>;
  let originalPlay: typeof HTMLMediaElement.prototype.play;
  let originalPause: typeof HTMLMediaElement.prototype.pause;
  let originalMatchMedia: typeof window.matchMedia;

  // Apuri: palauta valeselain-MediaQueryList halutulla matches-arvolla
  const mockMatchMedia = (reduceMotion: boolean) => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: reduceMotion && query.includes('reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  };

  beforeEach(() => {
    // Korvataan IO-mokki tässä testissä yhdellä joka tallentaa callbackin → voidaan triggata käsin
    class CapturingIO {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = '';
      thresholds = [];
    }
    vi.stubGlobal('IntersectionObserver', CapturingIO);

    // Mokataan video.play / video.pause (jsdomissa ne heittävät)
    originalPlay = HTMLMediaElement.prototype.play;
    originalPause = HTMLMediaElement.prototype.pause;
    playMock = vi.fn().mockResolvedValue(undefined);
    HTMLMediaElement.prototype.play = playMock as unknown as typeof HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.pause = vi.fn() as unknown as typeof HTMLMediaElement.prototype.pause;

    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    HTMLMediaElement.prototype.play = originalPlay;
    HTMLMediaElement.prototype.pause = originalPause;
    window.matchMedia = originalMatchMedia;
    vi.unstubAllGlobals();
    observerCallback = null;
  });

  test('EI lähde soimaan, jos käyttäjällä on prefers-reduced-motion käytössä', () => {
    mockMatchMedia(true);

    render(<ScrollVideoTransition />);

    // Simuloi: video tulee näkyviin viewportiin
    observerCallback?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(playMock).not.toHaveBeenCalled();
  });

  test('lähtee soimaan normaalisti, jos liikkeen vähennys ei ole päällä', () => {
    mockMatchMedia(false);

    render(<ScrollVideoTransition />);

    observerCallback?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(playMock).toHaveBeenCalled();
  });

  test('video-elementissä on poster-attribuutti (ei mustaa neliötä latauksen aikana)', () => {
    mockMatchMedia(false);
    const { container } = render(<ScrollVideoTransition />);

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('poster');
    expect(video!.getAttribute('poster')).not.toBe('');
  });
});
