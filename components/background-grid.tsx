import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Grid } from "components/grid";
import { useGrid } from "components/grid-context";

// Including min, excluding max
const randomIntInRange = (min: number, max: number) =>
  Math.trunc(Math.random() * (max - min) + min);

const randomPick = <T extends unknown>(arr: T[]): T =>
  arr[randomIntInRange(0, arr.length)];

const randomPickN = <T extends unknown>(arr: T[], n: number): T[] => {
  const available = [...arr];
  const result = [];
  for (let i = 0; i < n; i += 1) {
    result.push(available.splice(randomIntInRange(0, available.length), 1)[0]);
  }
  return result;
};

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

const paths = [
  "/background/alice.jpg",
  "/background/couple.jpg",
  "/background/dna-dark.jpg",
  "/background/dna-light.jpg",
  "/background/flower.jpg",
  "/background/fractal.jpg",
  "/background/maria-sabina.jpg",
  "/background/mind-expansion.jpg",
  "/background/more-shrooms.jpg",
  "/background/sasha-shulgin.jpg",
  "/background/shrooms.jpg",
  "/background/stamp-borderless.jpg",
  "/background/stan-grof.jpg",
  "/background/suit-man.jpg",
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
      // (Re-)Initialize images array now that grid is known
      setImages(
        randomPickN(paths, 4).map((src) => ({
          src,
          gridArea: randomGridArea({ cols, rows }),
        }))
      );

      const switchImage = () => {
        setImages((prev) =>
          prev.slice(1).concat({
            src: randomPick(
              paths.filter((path) => prev.every(({ src }) => src !== path))
            ),
            gridArea: randomGridArea({ cols, rows }),
          })
        );
      };

      interval = setInterval(switchImage, 10000);
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
