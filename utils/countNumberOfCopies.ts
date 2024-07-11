import { type GetTokensByOwnerData } from "@/lib/types";

export function countNumberOfCopies(
  arr: GetTokensByOwnerData
): Record<string, number> {
  return arr.tokens.reduce(
    (acc, element) => {
      const key = element.tokenId;
      if (acc[key]) {
        acc[key]++;
      } else {
        acc[key] = 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );
}
