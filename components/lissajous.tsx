import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import * as React from "react";

// Code for Lissajous taken from:
// https://academo.org/demos/lissajous-curves/

interface CurveConfig {
  a?: number;
  b?: number;
  rx?: number;
  ry?: number;
  theta?: number;
}

// https://stackoverflow.com/a/17445304
const gcd = (a: number, b: number): number => {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
};

const period = Math.PI * 2;

const getPathData = (
  phi: number,
  { a = 3, b = 1, rx = 60, ry = 100, theta = 0 }: CurveConfig = {}
) => {
  const commonFactor = gcd(a, b);

  a /= commonFactor;
  b /= commonFactor;

  const numberOfPoints = Math.ceil(period * 100);
  const angleStep = period / numberOfPoints;
  const x = rx * Math.sin(a * theta + phi * Math.PI);
  const y = ry * Math.sin(b * theta);
  let pathData = "M" + x + "," + y + " ";
  for (let i = 1; i <= numberOfPoints; i += 1) {
    const x = rx * Math.sin(a * i * angleStep + phi * Math.PI);
    const y = ry * Math.sin(b * i * angleStep);
    // multiply y coordinate by -1 to make sure increase in y goes up on chart instead of down.
    pathData += "L" + x + "," + y * -1 + " ";
  }
  return pathData;
};

interface AnimationCallback<T> {
  (deltaTime: number): T;
}

// https://css-tricks.com/using-requestanimationframe-with-react-hooks/
const useAnimationFrame = <T,>(callback: AnimationCallback<T>) => {
  const requestRef = React.useRef(0);
  const previousTimeRef = React.useRef(0);

  const animate = (time: number) => {
    if (previousTimeRef.current > 0) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
};

interface LissajousProps extends Omit<BoxProps, "children"> {
  freqA?: number;
  freqB?: number;
}

export const Lissajous = ({
  freqA = 1,
  freqB = 3,
  ...rest
}: LissajousProps) => {
  const [pathData, setPathData] = React.useState("");
  const phiRef = React.useRef(0);

  useAnimationFrame(() => {
    phiRef.current = (phiRef.current + 0.004) % 2;
    setPathData(getPathData(phiRef.current));
  });

  return (
    <Box {...rest}>
      <svg viewBox="-115 -115 230 230" width="100%">
        <path fill="none" stroke="#f2bebe" strokeWidth="8" d={pathData}></path>
      </svg>
    </Box>
  );
};
