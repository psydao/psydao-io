import getPoolApy from "@/utils/calculateApy";
import { DEFAULT_APY_RESULT, BLOCKS_PER_YEAR } from "@/constants/apy";
import { vi } from "vitest";

describe("getPoolApy", () => {
  it("calculates APY correctly for valid inputs", async () => {
    const prices = {
      rewardToken: { price: 2.0, symbol: "BIO" },
      stakedToken: { price: 1.0, symbol: "PSY" }
    };
    const apyDetails = {
      pool: {
        id: "0",
        allocPoint: 100n,
        token: { id: "1", symbol: "PSY", decimals: 18 }
      },
      globalStats: [
        {
          id: "0",
          rewardPerBlock: 1000000000000000000n, // 1 BIO per block
          totalDeposited: 1000000000000000000000n, // 1000 PSY
          bonusMultiplier: 1n
        }
      ]
    };
    const multiplier = 1n;
    const totalAllocPoint = 100;

    const result = await getPoolApy(
      prices,
      apyDetails,
      multiplier,
      totalAllocPoint
    );

    const expectedYearlyRewardsUsd = ((1 * 100) / 100) * BLOCKS_PER_YEAR * 2;
    const expectedTvlUsd = 1000 * 1;
    const expectedApy = (expectedYearlyRewardsUsd / expectedTvlUsd) * 100;

    expect(result.apy).toBeCloseTo(expectedApy, 2);
    expect(result.tvlUsd).toBe(expectedTvlUsd);
    expect(result.yearlyRewardsUsd).toBeCloseTo(expectedYearlyRewardsUsd, 2);
  });
});

describe("0 totalDeposited", () => {
  it("returns default apy result if totalDeposited is 0", async () => {
    const prices = {
      rewardToken: { price: 2.0, symbol: "BIO" },
      stakedToken: { price: 1.0, symbol: "PSY" }
    };
    const apyDetails = {
      pool: {
        id: "0",
        allocPoint: 100n,
        token: { id: "1", symbol: "PSY", decimals: 18 }
      },
      globalStats: [
        {
          id: "0",
          rewardPerBlock: 1000000000000000000n, // 1 BIO per block
          totalDeposited: 0n, // 0 PSY
          bonusMultiplier: 1n
        }
      ]
    };
    const multiplier = 1n;
    const totalAllocPoint = 100;
    const result = await getPoolApy(
      prices,
      apyDetails,
      multiplier,
      totalAllocPoint
    );
    expect(result).toEqual(DEFAULT_APY_RESULT);
  });
});

describe("0 rewardPerBlock", () => {
  it("returns default APY result if rewardPerBlock is 0", async () => {
    const prices = {
      rewardToken: { price: 2.0, symbol: "BIO" },
      stakedToken: { price: 1.0, symbol: "PSY" }
    };
    const apyDetails = {
      pool: {
        id: "0",
        allocPoint: 100n,
        token: { id: "1", symbol: "PSY", decimals: 18 }
      },
      globalStats: [
        {
          id: "0",
          rewardPerBlock: 0n, // 0 BIO per block
          totalDeposited: 1000000000000000000000n, // 1000 PSY
          bonusMultiplier: 1n
        }
      ]
    };
    const multiplier = 1n;
    const totalAllocPoint = 1000;
    const result = await getPoolApy(
      prices,
      apyDetails,
      multiplier,
      totalAllocPoint
    );

    expect(result).toEqual({
      ...DEFAULT_APY_RESULT,
      tvlUsd: result.tvlUsd,
      lastUpdated: result.lastUpdated
    });
  });
});

describe("error fetching prices (prices return a default price)", () => {
  it("returns default apy result if no price input", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const apyDetails = {
      pool: {
        id: "0",
        allocPoint: 100n,
        token: { id: "1", symbol: "PSY", decimals: 18 }
      },
      globalStats: [
        {
          id: "0",
          rewardPerBlock: 1000000000000000000n, // 1 BIO per block
          totalDeposited: 1000000000000000000000n, // 1000 PSY
          bonusMultiplier: 1n
        }
      ]
    };
    const result = await getPoolApy(undefined, apyDetails, 1n, 1000);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Missing required data for APY calculation"
    );
    expect(result).toEqual(DEFAULT_APY_RESULT);
  });
});

describe("error fetching APY details", () => {
  it("returns default APY result and console error if error fetching apy details", async () => {
    const prices = {
      rewardToken: { price: 0.1, symbol: "BIO" },
      stakedToken: { price: 0.2, symbol: "PSY" }
    };

    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getPoolApy(prices, undefined, 1n, 100);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Missing required data for APY calculation"
    );
    expect(result).toEqual(DEFAULT_APY_RESULT);
  });
});

describe("error fetching multiplier", () => {
  it("returns default APY result if multiplier is undefined", async () => {
    const prices = {
      rewardToken: { price: 0.1, symbol: "BIO" },
      stakedToken: { price: 0.2, symbol: "PSY" }
    };
    const apyDetails = {
      pool: {
        id: "0",
        allocPoint: 100n,
        token: { id: "1", symbol: "PSY", decimals: 18 }
      },
      globalStats: [
        {
          id: "0",
          rewardPerBlock: 1000000000000000000n, // 1 BIO per block
          totalDeposited: 1000000000000000000000n, // 1000 PSY
          bonusMultiplier: 1n
        }
      ]
    };
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getPoolApy(prices, apyDetails, undefined, 100);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Missing required data for APY calculation"
    );
    expect(result).toEqual(DEFAULT_APY_RESULT);
  });
});

describe("error fetching totalAllocPoint", () => {
  it("returns default APY result if totalAllocPoint is undefined", async () => {
    const prices = {
      rewardToken: { price: 0.1, symbol: "BIO" },
      stakedToken: { price: 0.2, symbol: "PSY" }
    };
    const apyDetails = {
      pool: {
        id: "0",
        allocPoint: 100n,
        token: { id: "1", symbol: "PSY", decimals: 18 }
      },
      globalStats: [
        {
          id: "0",
          rewardPerBlock: 1000000000000000000n, // 1 BIO per block
          totalDeposited: 1000000000000000000000n, // 1000 PSY
          bonusMultiplier: 1n
        }
      ]
    };
    const result = await getPoolApy(prices, apyDetails, 1n, undefined);
    expect(result).toEqual(DEFAULT_APY_RESULT);
  });
});
