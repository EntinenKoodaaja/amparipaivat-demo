import { useEffect, useRef } from 'react';

export default function ScrollVideoTransition() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Kunnioita käyttäjän OS-tason "vähennä liikettä" -asetusta
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative h-[60vh] sm:h-screen overflow-hidden">
      <video
        ref={videoRef}
        src="/tokmanni-bucket.mp4"
        poster="/tokmanni-bucket-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="metadata"
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
