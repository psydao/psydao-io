import { formatUnits } from "viem";
import { format, fromUnixTime } from "date-fns";

export const formatDate = (timestamp: bigint) => {
  return format(fromUnixTime(Number(timestamp)), "dd MMM yyyy");
};

export const formatSmallNumber = (_val: number, maxFractionDigits = 4) => {
  if (_val % 1 == 0) {
    return Math.round(_val).toLocaleString();
  } else {
    // For very small numbers, use fixed notation with appropriate decimal places
    // instead of scientific notation
    if (_val < 10 ** -maxFractionDigits) {
      // Determine how many decimal places we need to show the significant digits
      const significantDigits = 2; // Match the precision used in toExponential(2)
      const magnitude = Math.floor(Math.log10(Math.abs(_val)));
      const decimalPlaces = Math.abs(magnitude) + significantDigits;

      // Return the fixed decimal representation directly without parseFloat
      // to preserve trailing zeros and prevent scientific notation
      return _val.toFixed(decimalPlaces);
    }
    return parseFloat(_val.toFixed(maxFractionDigits)).toString();
  }
};

export function humanNumber(
  value: number,
  scale = false,
  maximumFractionDigits = 4,
  minScaleValue = 50_000,
  locale = "en-US"
): string {
  const absValue = Math.abs(value);

  if (absValue < 1) {
    return formatSmallNumber(absValue, maximumFractionDigits);
  }

  if (scale) {
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits
    });

    if (absValue >= 1_000_000_000) {
      return formatter.format(value / 1_000_000_000) + "B";
    } else if (absValue >= 1_000_000) {
      return formatter.format(value / 1_000_000) + "M";
    } else if (absValue >= minScaleValue) {
      return formatter.format(value / 1_000) + "K";
    } else if (absValue >= 1_000) {
      return formatter.format(Math.round(absValue));
    }
  }

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits
  });

  return formatter.format(value);
}

export function humanBigint(
  value: bigint | string,
  decimals = 18,
  scale?: boolean,
  maximumFractionDigits?: number
) {
  return humanNumber(
    parseFloat(
      formatUnits(typeof value === "string" ? BigInt(value) : value, decimals)
    ),
    scale,
    maximumFractionDigits
  );
}
