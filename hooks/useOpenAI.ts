import { Configuration, OpenAIApi } from "openai";
import {
  Configuration as OpenAIConfiguration,
  OpenAIApi as OpenAIApiType,
} from "openai";

export const useOpenAI = () => {
  const configuration: OpenAIConfiguration = new Configuration({
    apiKey: `${process.env.NEXT_PUBLIC_OPEN_AI}`,
  });
  const openAI: OpenAIApiType = new OpenAIApi(configuration);
  return openAI;
};
