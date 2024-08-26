import type { Sale } from "@/lib/types";

const getRandomAndOriginalTokenIds = (
  isOriginal: boolean,
  activeSale: Sale | undefined,
  randomCopies: {
    tokenID: string;
    tokenActive: boolean;
  }[]
) => {
  const specificTokenIds =
    activeSale?.tokensOnSale.map((token) => token.tokenID) ?? [];
  const randomCopiesFull = randomCopies.filter(
    (token) => token.tokenActive === true
  );
  const randomCopiesIds = randomCopiesFull.map((token) => token.tokenID);

  const availableRandomTokenIds = isOriginal
    ? activeSale?.tokensOnSale
        .filter((token) => token.buyer === null)
        .map((token) => token.tokenID) ?? []
    : randomCopiesIds;

  const randomTokenIds =
    availableRandomTokenIds.length === 0
      ? activeSale?.tokensOnSale.map((token) => token.tokenID) ?? []
      : availableRandomTokenIds;

  return {
    specificTokenIds,
    randomTokenIds
  };
};

export default getRandomAndOriginalTokenIds;
