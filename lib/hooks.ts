import { useCallback, useState } from "react";

interface Dimensions {
  contentBox: {
    height: number;
    width: number;
  };
  borderBox: {
    height: number;
    width: number;
  };
}

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState<Dimensions>();

  const ref = useCallback((ref: HTMLElement | null) => {
    const observer = new ResizeObserver((entries) => {
      setDimensions({
        contentBox: {
          height: entries?.[0]?.contentBoxSize?.[0]?.blockSize ?? 0,
          width: entries?.[0]?.contentBoxSize?.[0]?.inlineSize ?? 0
        },
        borderBox: {
          height: entries?.[0]?.borderBoxSize?.[0]?.blockSize ?? 0,
          width: entries?.[0]?.borderBoxSize?.[0]?.inlineSize ?? 0
        }
      });
    });

    if (ref) {
      observer.observe(ref);
    }

    // TODO R&D whether not being able to disconnect will create a memory leak
    // return () => observer.disconnect();
  }, []);

  return { ...dimensions, ref };
};
