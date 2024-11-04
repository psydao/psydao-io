import { Address } from "viem";

/**
 * Maps production addresses to test wallets for development/testing.
 * When TEST_ENV is true, any distributions or votes from production addresses
 * will be redirected to their corresponding test wallet.
 * 
 * Example:
 * If address1 voted on a proposal, in test mode that vote will be counted
 * as coming from testWallet1 instead.
 */
export const userTestMapping: { [key: Address]: Address } = {
    "0xc3ac5ef1a15c40241233c722fe322d83b010e445": "0xd9c0bb3476ce2ad2102d3ac07287bb802eea98f1",
    "0x1db67d560813ea7aba48bd8a9429cbecbeb2118e": "0x7c6d212e46e38f7c1a9c12d1664ce90b202715a4",
    "0x07effc25352088e044d2e91e57d06877c5d49e46": "0x8754a4c886f8cb77a1d2f38470c653ddb4727f21", // ester
    "0x25289f93738b78bf2b62c4a331d90160a0f961fc": "0xe6ba5bb7238e7c38c7c5ff5f0da2223c50a466f8",
    "0x5c8aed9972b94d2656a13550365d734ba04b5f90": "0xf6cdb1e733ea00d0eea1a32f218b0ec76abf1517", // courtney
    "0x407a6d10206f40a7aec3046fc17c4a186171b4e7": "0xf2217ba914d9c07b81c5e4b10a2eb2ec478d49aa",
    "0x2868a501b37f11cfdcfef96e9ad0588e0932b9de": "0x2868a501b37f11cfdcfef96e9ad0588e0932b9de"
};
// Remove this after testing