import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * useGlobalLoader
 * ----------------
 * Determines when a page is considered "ready" and exposes a loading boolean.
 * A page is ready when:
 *   1. All <img> elements are fully loaded (complete === true)
 *   2. All custom web-fonts are active (document.fonts.ready)
 *   3. All <video> elements have fired the `loadeddata` event (first frame decoded)
 *
 * The hook automatically re-runs on every route change by relying on `usePathname`.
 *
 * NOTE: Internally we apply a maximum timeout so the app never gets stuck in
 *       the loading state if a single asset fails.
 * Videos:
 *   • Each <video> tag should include a lightweight poster image as a data URI or CDN URL to prevent black flashes on slower connections.
 *   • If your component cannot define a poster up-front, set a `data-poster="https://cdn.example.com/videos/my-video.jpg"` attribute and this hook will promote it to the real `poster` attribute automatically.
 *   • For optimal delivery host large mp4 / webm files on a dedicated CDN and reference them with full https URLs rather than importing from the `/public` folder. This ensures the files are cached close to your users and reduces Next.js build sizes.
 */
export const useGlobalLoader = (timeoutMs: number = 12000) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    /** Helper – resolves when ALL <img> elements are loaded */
    const waitForImages = (): Promise<void> => {
      return new Promise((resolve) => {
        const images = Array.from<HTMLImageElement>(document.querySelectorAll('img'));
        if (images.length === 0) return resolve();

        let loaded = 0;
        const check = () => {
          loaded += 1;
          if (loaded >= images.length) resolve();
        };

        images.forEach((img) => {
          if (img.complete) {
            check();
          } else {
            img.addEventListener('load', check, { once: true });
            img.addEventListener('error', check, { once: true }); // ignore failed images
          }
        });
      });
    };

    /** Helper – resolves when ALL <video> elements have first frame ready */
    const waitForVideos = () => {
      return new Promise<void>((resolve) => {
        const videos = Array.from<HTMLVideoElement>(document.querySelectorAll('video'));
        if (videos.length === 0) return resolve();

        let ready = 0;
        const check = () => {
          ready += 1;
          if (ready >= videos.length) resolve();
        };

        videos.forEach((video) => {
          // Attach a poster dynamically if missing to avoid black flashes
          if (!video.poster) {
            const fallbackPoster = video.getAttribute('data-poster');
            if (fallbackPoster) {
              video.poster = fallbackPoster;
            }
          }

          if (video.readyState >= 2) {
            // HAVE_CURRENT_DATA (first frame is available)
            check();
          } else {
            video.addEventListener('loadeddata', check, { once: true });
            video.addEventListener('error', check, { once: true }); // ignore failed streams
          }
        });
      });
    };

    /** Fonts – simply wait for the standard Font Loading API */
    const waitForFonts = () => (document as any).fonts?.ready ?? Promise.resolve();

    /** hard timeout so we never block forever */
    const hardTimeout = new Promise<void>((resolve) => {
      setTimeout(resolve, timeoutMs);
    });

    Promise.race([
      Promise.all([waitForImages(), waitForVideos(), waitForFonts()]),
      hardTimeout,
    ]).then(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [pathname, timeoutMs]);

  return isLoading;
};

export default useGlobalLoader;
