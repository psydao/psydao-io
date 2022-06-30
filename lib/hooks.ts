import { useLayoutEffect, useState } from "react";

export const useSize = (target: React.RefObject<HTMLElement | null>) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setHeight(entries[0].contentBoxSize[0].blockSize);
      setWidth(entries[0].contentBoxSize[0].inlineSize);
    });

    if (target.current !== null) {
      observer.observe(target.current);
    }

    return () => observer.disconnect();
  });

  return { height, width };
};