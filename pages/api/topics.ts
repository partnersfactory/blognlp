import type { NextApiRequest, NextApiResponse } from "next";
import {
  Configuration as OpenAIConfiguration,
  OpenAIApi as OpenAIApiType,
} from "openai";
import { Configuration, OpenAIApi } from "openai";

const configuration: OpenAIConfiguration = new Configuration({
  apiKey: `${process.env.NEXT_PUBLIC_OPEN_AI}`,
});

const openai: OpenAIApiType = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Generate blog topics on ${req.body.text}.`,
    temperature: 0.8,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    user: "user123456",
  });
  res.status(200).json({ result: completion.data });
}
