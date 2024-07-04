function fibonacci(batchId: number): number {
  if (batchId <= 0) return 0;
  if (batchId === 1) return 3;
  if (batchId === 2) return 2;

  let a = 1; // F(1)
  let b = 1; // F(2)
  let fib = 1; // To store F(batchId)

  for (let i = 2; i <= batchId; i++) {
    fib = a + b;
    a = b;
    b = fib;
  }

  return fib;
}

// we will get last token Id from a call to the SG or contract
export function generateNftIds(batchId: number, lastTokenId: number) {
  // Get the Fibonacci number for the given batchId
  if (batchId < 1) {
    throw new Error("Invalid batch Id");
  }
  const fibNumber = fibonacci(batchId);
  const nftIds: number[] = [];
  // Generate consecutive NFT IDs based on the last token Id of the previous batch
  // This will be the value sent to the useCreateSale hook
  for (let i = 0; i < fibNumber; i++) {
    if (batchId === 1) {
      nftIds.push(lastTokenId + i);
    } else nftIds.push(lastTokenId + i + 1);
  }
  return nftIds;
}
