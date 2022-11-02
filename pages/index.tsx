import React, { useState, useMemo } from "react";
import { Button, NextUIProvider, Loading, Input } from "@nextui-org/react";
import { Seo } from "../components/Seo";
import {
  Configuration as OpenAIConfiguration,
  CreateCompletionResponseChoicesInner,
  OpenAIApi as OpenAIApiType,
} from "openai";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

export default function Home() {
  const [idea, setIdea] = useState({
    topic: "",
    headline: "",
    outline: "",
    article: "",
  });
  const [loading, setLoading] = useState({
    topic: false,
    headline: false,
    outline: false,
    article: false,
  });

  const [topics, setTopics] = useState<
    CreateCompletionResponseChoicesInner[] | null
  >(null);
  const [headlines, setHeadlines] = useState<
    CreateCompletionResponseChoicesInner[] | null
  >(null);
  const [outline, setOutline] = useState<
    CreateCompletionResponseChoicesInner[] | null
  >(null);
  const [article, setArticle] = useState<
    CreateCompletionResponseChoicesInner[] | null
  >(null);

  const configuration: OpenAIConfiguration = new Configuration({
    apiKey: `${process.env.NEXT_PUBLIC_OPEN_AI}`,
  });

  const openai: OpenAIApiType = new OpenAIApi(configuration);

  const generateBlogTopics = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      topic: true,
    });
    const response = await fetch("/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: idea.topic }),
    });
    const data = await response.json();
    setLoading({
      ...loading,
      topic: false,
    });
    setTopics(data.result.choices as CreateCompletionResponseChoicesInner[]);
  };

  // const generateBlogTopics = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading({
  //     ...loading,
  //     topic: true,
  //   });
  //   const response = await openai.createCompletion({
  //     model: "text-davinci-002",
  //     prompt: `Generate blog topics on ${idea.topic}.`,
  //     temperature: 0.8,
  //     max_tokens: 200,
  //     top_p: 1,
  //     frequency_penalty: 0.5,
  //     presence_penalty: 0,
  //     user: "user123456",
  //   });
  //   setLoading({
  //     ...loading,
  //     topic: false,
  //   });
  //   setTopics(response.data.choices);
  // };

  const generateBlogHeadlines = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      headline: true,
    });
    const response = await fetch("/api/headline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: idea.headline }),
    });
    const data = await response.json();

    setLoading({
      ...loading,
      headline: false,
    });
    setHeadlines(data.result.choices as CreateCompletionResponseChoicesInner[]);
  };

  const generateBlogOutline = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      outline: true,
    });
    const response = await fetch("/api/outline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: idea.outline }),
    });
    const data = await response.json();

    setLoading({
      ...loading,
      outline: false,
    });
    setOutline(data.result.choices as CreateCompletionResponseChoicesInner[]);
  };

  const generateBlogArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      article: true,
    });

    const response = await fetch("/api/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: idea.article }),
    });
    const data = await response.json();

    setLoading({
      ...loading,
      article: false,
    });
    setArticle(data.result.choices as CreateCompletionResponseChoicesInner[]);
  };

  const blogTopics: string[] | undefined = useMemo(() => {
    if (!topics) return [];
    return topics[0].text?.split("\n").filter((topic) => topic.length > 0);
  }, [topics]);

  const blogOutline: string[] | undefined = useMemo(() => {
    if (!outline) return [];
    return outline[0].text?.split("\n").filter((outline) => outline.length > 0);
  }, [outline]);

  const blogArticle: string[] | undefined = useMemo(() => {
    if (!article) return [];
    return article[0].text?.split("\n").filter((article) => article.length > 0);
  }, [article]);

  const blogHeadlines: string[] | undefined = useMemo(() => {
    if (!headlines) return [];
    return headlines[0].text
      ?.split("\n")
      .filter((headline) => headline.length > 0);
  }, [headlines]);

  return (
    <div>
      <Seo />

      <div className="min-h-screen w-full py-5 px-2  text-black md:flex md:items-center md:justify-center">
        <NextUIProvider>
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div>
              <h1 className="m-0">
                BlogNLP{" "}
                <span role="img" aria-label="writing-hand">
                  ✍️
                </span>
              </h1>
              <p className="w-full text-sm md:w-[500px] mb-5">
                BlogNLP is a free AI blog writing tool that helps you break your
                writer&apos;s block to create original content in a fraction of
                a time. Powered by Open AI&apos;s GPT-3.
              </p>
            </div>
            <main className="flex flex-col overflow-y-scroll w-full md:w-[650px] max-h-[700px]">
              <div className="flex flex-col">
                <h2 className="px-4 m-0 text-xl">
                  Generate blog topics to write about 💡
                </h2>
                <form className="px-4" onSubmit={(e) => generateBlogTopics(e)}>
                  <div className="flex space-x-5 items-center text-white">
                    <Input
                      id="topic_input"
                      aria-label="topic_input"
                      width="340px"
                      color="default"
                      clearable
                      underlined
                      placeholder="Enter a blog topic.. (ex. Madrid, Paris, Lisbon)"
                      value={idea.topic}
                      onChange={(e) =>
                        setIdea({
                          ...idea,
                          topic: e.target.value,
                        })
                      }
                    />
                    {loading.topic && <Loading />}
                    {!loading.topic && (
                      <Button
                        disabled={!idea.topic}
                        type="submit"
                        size={"sm"}
                        color="gradient"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </form>
                <div className="px-4 mt-5">
                  {blogTopics?.map((topic) => (
                    <p key={topic} className="text-sm mb-4">
                      {topic}
                    </p>
                  ))}
                </div>
              </div>
              <div className="border my-5"></div>
              <div className="flex flex-col space-y-4">
                <h2 className="px-4 m-0 text-xl">
                  Generate an outline to better organize your blog ✅
                </h2>
                <form className="px-4" onSubmit={(e) => generateBlogOutline(e)}>
                  <div className="flex space-x-5 items-center">
                    <Input
                      id="outline_input"
                      aria-label="outline_input"
                      width="340px"
                      color="default"
                      clearable
                      underlined
                      placeholder="Enter a blog topic.. (ex. Capricorn, Scorpio, Leo)"
                      value={idea.outline}
                      onChange={(e) =>
                        setIdea({
                          ...idea,
                          outline: e.target.value,
                        })
                      }
                    />
                    {loading.outline && <Loading />}
                    {!loading.outline && (
                      <Button
                        disabled={!idea.outline}
                        type="submit"
                        size={"sm"}
                        color="gradient"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </form>
                <div className="px-4 mt-5">
                  {blogOutline?.map((text) => (
                    <p key={text} className="text-sm mb-4">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
              <div className="border my-5"></div>
              <div className="flex flex-col space-y-4">
                <h2 className="px-4 m-0 text-xl">
                  Generate an attention-grabbing headline for your blog ⭐️
                </h2>
                <form
                  className="px-4"
                  onSubmit={(e) => generateBlogHeadlines(e)}
                >
                  <div className="flex space-x-5 items-center">
                    <Input
                      id="headline_input"
                      aria-label="headline_input"
                      width="340px"
                      color="default"
                      clearable
                      underlined
                      placeholder="Enter a blog topic.. (ex. Ursa Minor, Pluto, Saturn)"
                      value={idea.headline}
                      onChange={(e) =>
                        setIdea({
                          ...idea,
                          headline: e.target.value,
                        })
                      }
                    />
                    {loading.headline && <Loading />}
                    {!loading.headline && (
                      <Button
                        disabled={!idea.headline}
                        type="submit"
                        size={"sm"}
                        color="gradient"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </form>
                <div className="px-4 mt-5">
                  {blogHeadlines?.map((text) => (
                    <p key={text} className="text-sm mb-4">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
              <div className="border my-5"></div>
              <div className="flex flex-col space-y-4">
                <h2 className="px-4 m-0 text-xl">
                  Generate a professionally written blog for inspiration ✨
                </h2>
                <form className="px-4" onSubmit={(e) => generateBlogArticle(e)}>
                  <div className="flex space-x-5 items-center">
                    <Input
                      id="article_input"
                      aria-label="article_input"
                      width="340px"
                      color="default"
                      clearable
                      underlined
                      placeholder="Enter a blog topic.. (ex. Google, Meta, Amazon)"
                      value={idea.article}
                      onChange={(e) =>
                        setIdea({
                          ...idea,
                          article: e.target.value,
                        })
                      }
                    />
                    {loading.article && <Loading />}
                    {!loading.article && (
                      <Button
                        disabled={!idea.article}
                        type="submit"
                        size={"sm"}
                        color="gradient"
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </form>
                <div className="px-5 mt-5">
                  {blogArticle?.map((text) => (
                    <p key={text} className="text-sm mb-4">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </NextUIProvider>
      </div>

      <footer className="flex justify-center space-y-2 flex-col items-center mb-10 text-xs">
        <span>
          Designed & built by
          <a
            target="_blank"
            rel="noreferrer"
            className="ml-1"
            href="https://kelvinbrito.dev"
          >
            Kelvin Brito
          </a>
        </span>
        <span>Made with ❤️ with Next.js & Tailwind</span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
