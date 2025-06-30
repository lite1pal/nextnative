import { useEffect, useState } from "react";

export function useWeakDevice({
  memoryThreshold = 2,
  screenWidthThreshold = 768,
  fpsThreshold = 30,
}: {
  memoryThreshold?: number;
  screenWidthThreshold?: number;
  fpsThreshold?: number;
} = {}) {
  const [isWeakDevice, setIsWeakDevice] = useState(false);

  useEffect(() => {
    const memory = (navigator as any).deviceMemory || 4;
    const screenIsSmall = window.innerWidth < screenWidthThreshold;

    let isCancelled = false;

    function detectLowFPS(samples = 30) {
      let last = performance.now();
      let frameCount = 0;
      let totalFPS = 0;

      function frame(now: number) {
        if (isCancelled) return;

        const delta = now - last;
        const fps = 1000 / delta;
        totalFPS += fps;
        frameCount++;

        if (frameCount >= samples) {
          const avgFPS = totalFPS / frameCount;
          if (
            avgFPS < fpsThreshold ||
            memory <= memoryThreshold ||
            screenIsSmall
          ) {
            setIsWeakDevice(true);
          }
        } else {
          last = now;
          requestAnimationFrame(frame);
        }
      }

      requestAnimationFrame(frame);
    }

    detectLowFPS();

    return () => {
      isCancelled = true;
    };
  }, [memoryThreshold, screenWidthThreshold, fpsThreshold]);

  return isWeakDevice;
}
