import type { NextApiRequest, NextApiResponse } from "next";
import { run } from "@banana-dev/banana-dev";

type Data = {
  audio?: string;
  error?: string;
};

type BananaResponse = {
  id: string;
  message: string;
  created: number;
  apiVersion: string;
  modelOutputs?: string[];
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body;
  const apiKey = process.env.BANANA_API_KEY || "";
  const modelKey = process.env.BANANA_FART_KEY || "";
  const modelInputs = body.modelInputs;

  console.log(modelInputs);

  const out = (await run(apiKey, modelKey, modelInputs)) as BananaResponse;
  console.log(out);
  if (out.modelOutputs === undefined) {
    res.status(500).json({ error: "Error" });
  } else {
    res.status(200).json({ audio: out.modelOutputs[0] });
  }
}
