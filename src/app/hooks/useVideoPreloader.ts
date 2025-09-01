import { useEffect, useState } from "react";

/**
 * Tracks matching <video> elements and returns true until every one is able to play
 * through without buffering (readyState >= 4 or fires `canplaythrough`).
 *
 * Intended for background hero videos that must be fully buffered before the
 * page loader disappears.
 */
export function useVideoPreloader(selectors: string = "video", timeout: number = 10000) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>(selectors));

    if (videos.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    let done = false;

    const markDone = () => {
      if (!done) {
        done = true;
        setIsLoading(false);
      }
    };

    const handleLoaded = () => {
      loadedCount += 1;
      if (loadedCount >= videos.length) {
        markDone();
      }
    };

    videos.forEach((video) => {
      // Make sure browser starts fetching immediately
      video.preload = "auto";

      if (video.readyState >= 2) {
        // HAVE_CURRENT_DATA means first frame is ready to paint
        handleLoaded();
      } else {
        video.addEventListener("loadeddata", handleLoaded, { once: true });
        video.addEventListener("canplaythrough", handleLoaded, { once: true });
      }
    });

    // Fallback timeout so we never block forever
    const timer = setTimeout(markDone, timeout);

    return () => {
      clearTimeout(timer);
      videos.forEach((video) => {
        video.removeEventListener("loadeddata", handleLoaded);
        video.removeEventListener("canplaythrough", handleLoaded);
      });
    };
  }, [selectors]);

  return isLoading;
}
