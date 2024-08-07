export const whitelistedAddresses = process.env
  .NEXT_PUBLIC_WHITELISTED_ADDRESSES
  ? process.env.NEXT_PUBLIC_WHITELISTED_ADDRESSES.split(",")
  : [];
