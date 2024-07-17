import type { NextApiRequest, NextApiResponse } from "next";

const keyRestrictions = {
  keyName: "Signed Upload JWT",
  maxUses: 1,
  permissions: {
    endpoints: {
      data: {
        pinList: false,
        userPinnedDataTotal: false
      },
      pinning: {
        pinFileToIPFS: true,
        pinJSONToIPFS: true,
        pinJobs: false,
        unpin: false,
        userPinPolicy: false
      }
    }
  }
};

type PinataResponse = {
  JWT: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PINATA_JWT}`
        },
        body: JSON.stringify(keyRestrictions)
      };

      const jwtResponse: Response = await fetch(
        "https://api.pinata.cloud/users/generateApiKey",
        options
      );
      if (!jwtResponse.ok) {
        throw new Error(`Failed to fetch JWT: ${jwtResponse.statusText}`);
      }

      const json = (await jwtResponse.json()) as PinataResponse;
      const { JWT } = json;

      res.status(200).send(JWT);
    } catch (error: unknown) {
      console.error("Error generating JWT:", error);
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Unknown error occurred");
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
