import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";

// Define the input schemas
const modelInputsSchema = z.object({
  width: z.number().min(64).max(768),
  height: z.number().min(64).max(768),
  prompt: z.string(),
  negative_prompt: z.string(),
  cfg: z.string(),
  steps: z.number().min(1).max(1000),
});

const callInputsSchema = z.object({
  model: z.enum(["model1", "model2", "model3"]),
  pipeline: z.enum(["pipeline1", "pipeline2", "pipeline3"]),
  scheduler: z.enum(["scheduler1", "scheduler2", "scheduler3"]),
});
const requestBodySchema = z.object({
  modelInputs: modelInputsSchema,
  callInputs: callInputsSchema,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validate the input against the defined schemas
    const validatedBody = requestBodySchema.parse(req.body);
    res.status(200).json({ data: validatedBody });
  } catch (error) {
    // Return an error if validation fails
    res.status(400).json({ error: `Input validation failed: ${error}` });
  }
};
