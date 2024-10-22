export async function fetchMerkleProof({ batchId }: { batchId: string }) {
  if (!batchId) {
    throw new Error("batchId is required");
  }

  try {
    const response = await fetch("/api/merkle-proof", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ batchId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }

    return data;
  } catch (error) {
    console.error("Error fetching Merkle proof:", error);
    throw new Error("Failed to fetch Merkle proof");
  }
}

const fetchDistributionData = async (
  batchId: string
): Promise<{
  data?: any;
  error?: any;
}> => {
  try {
    const response = await fetch("/api/distribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        batchId: batchId
      })
    });

    if (!response.ok) {
      const result = await response.json();
      console.error("Error:", result.error);
      return { error: result.error };
    }

    const result = await response.json();
    console.log(result);
    return { data: result };
  } catch (error) {
    console.error("Error calling API:", error);
    return { error };
  }
};
