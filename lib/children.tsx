import * as React from "react";

export const pick = (children: React.ReactNode, names: string[]) => {
  const picked = Array(names.length).fill(null);
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && typeof child.type !== "string") {
      // typeof child.type !== "string" twice: first for perf, second for TS 🤷‍♂️
      const idx = names.findIndex(
        (name) => typeof child.type !== "string" && name === child.type.name
      );
      if (idx > -1) {
        picked[idx] = child;
      }
    }
  });
  return picked;
};
