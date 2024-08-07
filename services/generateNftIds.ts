function fibonacci(batchId: number): number {
  if (batchId <= 0) return 0;
  if (batchId === 1) return 3;
  if (batchId === 2) return 2;

  let a = 1;
  let b = 1;
  let fib = 1;

  for (let i = 2; i <= batchId; i++) {
    fib = a + b;
    a = b;
    b = fib;
  }

  return fib;
}

export function generateNftIds(batchId: number, lastTokenId: number): number[] {
  if (batchId < 1 || isNaN(batchId) || isNaN(lastTokenId)) {
    throw new Error("Invalid batchId or lastTokenId");
  }

  console.log(
    "Generating NFT IDs for batchId:",
    batchId,
    "and lastTokenId:",
    lastTokenId
  );

  const fibNumber = fibonacci(batchId);
  const nftIds: number[] = [];

  for (let i = 0; i < fibNumber; i++) {
    if (batchId === 1) {
      nftIds.push(lastTokenId + i);
    } else {
      nftIds.push(lastTokenId + i + 1);
    }
  }

  return nftIds;
}
