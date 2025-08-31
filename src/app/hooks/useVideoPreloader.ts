import { useEffect, useState } from "react";

/**
 * Tracks matching <video> elements and returns true until every one is able to play
 * through without buffering (readyState >= 4 or fires `canplaythrough`).
 *
 * Intended for background hero videos that must be fully buffered before the
 * page loader disappears.
 */
export function useVideoPreloader(selectors: string = "video") {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>(selectors));

    if (videos.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const total = videos.length;

    const handleLoaded = () => {
      loadedCount += 1;
      if (loadedCount >= total) {
        setIsLoading(false);
      }
    };

    videos.forEach((video) => {
      if (video.readyState >= 4) {
        // Already buffered enough.
        handleLoaded();
      } else {
        video.addEventListener("canplaythrough", handleLoaded, { once: true });
      }
    });

    return () => {
      videos.forEach((video) => {
        video.removeEventListener("canplaythrough", handleLoaded);
      });
    };
  }, [selectors]);

  return isLoading;
}
