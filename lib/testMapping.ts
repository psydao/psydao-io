import { Address } from "viem";

export const TEST_ENV = true;

export const userTestMapping: { [key: Address]: Address } = {
  "0xc3ac5ef1a15c40241233c722fe322d83b010e445":
    "0xde540b4f4591d9c6fa28afcb40ac302172502392", // ester 2
  "0x5de3f8b1e1c758c3fe0b300aa376da229a732dc9":
    "0x1db67d560813ea7aba48bd8a9429cbecbeb2118e", // mu
  "0x407a6d10206f40a7aec3046fc17c4a186171b4e7":
    "0xf6cdb1e733ea00d0eea1a32f218b0ec76abf1517", // courtney
  "0x07effc25352088e044d2e91e57d06877c5d49e46":
    "0xecf296664697227250496d4a01939fa1cd666553", // courtney 2

  "0x1885754425d75bddce43bd82f24f160d8f6abadf":
    "0xe2902ab6bd62e254b67c7cd4674d0d1db1f92695", // Liam
  "0x634646a55f9e6efccd87b3dbc7d022064c55e2fc":
    "0x8754a4c886f8cb77a1d2f38470c653ddb4727f21", // ester
  "0x2868a501b37f11cfdcfef96e9ad0588e0932b9de":
    "0x2868a501b37f11cfdcfef96e9ad0588e0932b9de", // gareth <> gareth
  "0x846e3d53c92712ae6eea5793ded3ee98de737ba7":
    "0xe6ba5Bb7238e7C38C7c5Ff5F0dA2223C50A466f8" // Myles
};
