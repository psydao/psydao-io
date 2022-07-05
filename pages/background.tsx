import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";

import { Center } from "@chakra-ui/react";
import { Csr } from "components/csr";
import { GlobalContext } from "components/global-context";
import { Grid } from "components/grid";

const srcs = [
  "amanita-muscaria.jpg",
  "borg-dali.jpg",
  "party-iguana.png",
  "plant.jpg",
  "sasha-shulgin-colorized.jpg",
  "shrooms-colorized.jpg",
  "stamp-colorized.jpg",
  "stan-grof.jpg",
];

const gridAreas = [
  "3 / 4 / span 3 / span 3",
  "6 / 2 / span 2 / span 2",
  "-8 / -6 / span 4 / span 4",
  "-4 / -4 / span 2 / span 3",
  "-7 / -7 / span 3 / span 3",
  "6 / -3 / span 2 / span 2",
  "-9 / -5 / span 4 / span 3",
  "-8 / -4 / span 2 / span 3",
];

const randomIntInRange = (min: number, max: number) =>
  Math.trunc(Math.random() * (max - min) + min);

const randomPick = <T extends unknown>(arr: T[]): T =>
  arr[randomIntInRange(0, arr.length)];

const getRandomGridArea = ({
  cols,
  rows,
}: {
  cols: number;
  rows: number;
}): string => {
  const minSpan = Math.trunc(Math.min(cols, rows) * 0.3);
  const maxSpan = Math.trunc(Math.min(cols, rows) * 0.7);
  const rowSpan = randomIntInRange(minSpan, maxSpan);
  const colSpan = randomIntInRange(
    Math.max(minSpan, rowSpan - 1),
    Math.min(maxSpan, rowSpan + 1)
  );
  const rowStart = randomIntInRange(1, rows + 1 - rowSpan);
  const colStart = randomIntInRange(1, cols + 1 - colSpan);
  return [rowStart, colStart, `span ${rowSpan}`, `span ${colSpan}`].join(" / ");
};

const FadingPage = () => {
  const { cols = 4, rows = 4 } = useContext(GlobalContext);

  const [images, setImages] = useState([
    {
      src: randomPick(srcs),
      gridArea: getRandomGridArea({ cols, rows }),
    },
    {
      src: randomPick(srcs),
      gridArea: getRandomGridArea({ cols, rows }),
    },
  ]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      setImages((prev) => [
        {
          src: randomPick(
            srcs.filter((src) => !prev.some((image) => src === image.src))
          ),
          gridArea: getRandomGridArea({ cols, rows }),
        },
        prev[0],
      ]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Csr>
      <Center h="100vh" w="100vw">
        <Grid position="absolute" top={0} left={0} h="100%" w="100%">
          <AnimatePresence>
            {images.map((image) => (
              <motion.img
                key={image.src + image.gridArea}
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
                }}
              />
            ))}
          </AnimatePresence>
        </Grid>
        <Grid
          position="relative"
          getNumberOfFillers={(cols, rows) => cols * rows}
        ></Grid>
      </Center>
    </Csr>
  );
};

export default FadingPage;
