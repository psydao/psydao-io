import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Grid } from "components/grid";
import { useGrid } from "components/grid-context";

// Including min, excluding max
const randomIntInRange = (min: number, max: number) =>
  Math.trunc(Math.random() * (max - min) + min);

const randomPick = <T extends unknown>(arr: T[]): T =>
  arr[randomIntInRange(0, arr.length)];

interface GridDimensions {
  cols: number;
  rows: number;
}

const randomGridArea = ({ cols, rows }: GridDimensions): string => {
  const size = Math.max(Math.round((cols * rows) / 60), 2);
  const col = randomIntInRange(1, cols - size + 1);
  const row = randomIntInRange(1, rows - size + 1);
  return `${row} / ${col} / span ${size} / span ${size}`;
};

const srcs = [
  "colorized-mind-expansion.jpg",
  "colorized-shrooms.jpg",
  "colorized-stan-grof.jpg",
  "colorized-sasha-shulgin.jpg",
  "colorized-maria-sabina.jpg",
  "colorized-fractal.jpg",
  "colorized-suit-man.jpg",
  "colorized-stamp-borderless.jpg",
];

interface Image {
  src: string;
  gridArea: string;
}

const numberOfImages = 4;

export const BackgroundGrid = () => {
  const { cols, rows } = useGrid();
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (cols && rows) {
      const getImages = (prev: Image[]) => {
        // We remove the first image if it exists
        const prevImages = prev.slice(1);
        // and pad with new images
        const newImages = new Array(numberOfImages - prevImages.length)
          .fill(null)
          .map(() => ({
            src: randomPick(srcs),
            gridArea: randomGridArea({ cols, rows }),
          }));
        return [...prevImages, ...newImages];
      };
      const addImages = () => {
        setImages(getImages);
      };
      addImages();
      interval = setInterval(addImages, 10000);
    }

    return () => clearInterval(interval);
  }, [cols, rows]);

  return (
    <Grid
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex={0}
      overflow="hidden"
    >
      <AnimatePresence>
        {images.map((image, idx) => (
          <motion.img
            key={image.src + image.gridArea + idx}
            src={image.src}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3 }}
            style={{
              gridArea: image.gridArea,
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              zIndex: idx,
            }}
          />
        ))}
      </AnimatePresence>
    </Grid>
  );
};
