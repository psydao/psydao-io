import { keyframes } from "@chakra-ui/react";

type RgbTuple = [number, number, number];

const midnight: RgbTuple = [55, 30, 114];
const noon: RgbTuple = [255, 250, 250];

const rgbTupleToHex = ([r, g, b]: RgbTuple) => {
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export const hourToHex = (hour: number) => {
  if (hour === 0) {
    return rgbTupleToHex(midnight);
  } else if (hour === 12) {
    return rgbTupleToHex(noon);
  } else if (hour < 12) {
    const ratio = hour / 12;
    const r = Math.trunc((noon[0] - midnight[0]) * ratio) + midnight[0];
    const g = Math.trunc((noon[1] - midnight[1]) * ratio) + midnight[1];
    const b = Math.trunc((noon[2] - midnight[2]) * ratio) + midnight[2];
    return rgbTupleToHex([r, g, b]);
  } else if (hour > 12) {
    const ratio = (hour - 12) / 12;
    const r = Math.trunc((midnight[0] - noon[0]) * ratio) + noon[0];
    const g = Math.trunc((midnight[1] - noon[1]) * ratio) + noon[1];
    const b = Math.trunc((midnight[2] - noon[2]) * ratio) + noon[2];
    return rgbTupleToHex([r, g, b]);
  }
};

// TODO optimize this whole calc. We always compute one background value and its
// diametrically opposite. Ratios are always the same. It seems we could be
// doing it a bit more efficiently. Look into it.
export const getDynamicBackgroundProps = () => {
  const hour = new Date().getHours();
  const background = hourToHex(hour);
  const backgroundEnd = hourToHex((hour + 12) % 24);
  const frames = keyframes`
    0% { background-color: ${background}; }
    50% { background-color: ${backgroundEnd}; }
    100% { background-color: ${background}; }
  `;
  return {
    background,
    animation: `${frames} 86400s infinite`,
  };
};
