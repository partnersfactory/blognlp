import React, { useState, useMemo } from "react";
import { Seo } from "../components/Seo";
import { CreateCompletionResponseChoicesInner } from "openai";
import { useOpenAI } from "../hooks/useOpenAI";
import { SectionForm } from "../components/SectionForm";

export default function Home() {
  const openAI = useOpenAI();
  const [idea, setIdea] = useState({
    topic: "",
    intro: "",
    outro: "",
    headline: "",
    outline: "",
    article: "",
  });
  const [loading, setLoading] = useState({
    topic: false,
    intro: false,
    outro: false,
    headline: false,
    outline: false,
    article: false,
  });

  const [topics, setTopics] = useState<
    CreateCompletionResponseChoicesInner[] | null
  >(null);
  const [intro, setIntro] = useState<
    CreateCompletionResponseChoicesInner[] | null
  >(null);
  const [outro, setOutro] = useState<
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

  const generateBlogTopics = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      topic: true,
    });
    const response = await openAI.createCompletion({
      model: "text-davinci-002",
      prompt: `Generate new blog post topics that will engage readers regarding ${idea.topic}.`,
      temperature: 0.8,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
      user: "user123456",
    });

    setLoading({
      ...loading,
      topic: false,
    });
    setTopics(response.data.choices);
  };

  const generateBlogIntro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      intro: true,
    });
    const response = await openAI.createCompletion({
      model: "text-davinci-002",
      prompt: `Generate the opening paragraph for a blog titled ${idea.intro}.`,
      temperature: 0.8,
      max_tokens: 350,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
      user: "user123456",
    });

    setLoading({
      ...loading,
      intro: false,
    });
    setIntro(response.data.choices);
  };

  const generateBlogOutro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      outro: true,
    });
    const response = await openAI.createCompletion({
      model: "text-davinci-002",
      prompt: `Generate the final concluding paragraph for a blog titled ${idea.outro}.`,
      temperature: 0.8,
      max_tokens: 350,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
      user: "user123456",
    });

    setLoading({
      ...loading,
      outro: false,
    });
    setOutro(response.data.choices);
  };

  const generateBlogHeadlines = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      headline: true,
    });
    const response = await openAI.createCompletion({
      model: "text-davinci-002",
      prompt: `Generate attention-grabbing blog headlines on ${idea.headline}.`,
      temperature: 0.8,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
      user: "user123456",
    });

    setLoading({
      ...loading,
      headline: false,
    });
    setHeadlines(response.data.choices);
  };

  const generateBlogOutline = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      outline: true,
    });
    const response = await openAI.createCompletion({
      model: "text-davinci-002",
      prompt: `Create lists and outlines for articles regarding ${idea.outline}.`,
      temperature: 0.8,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
      user: "user123456",
    });

    setLoading({
      ...loading,
      outline: false,
    });
    setOutline(response.data.choices);
  };

  const generateBlogArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({
      ...loading,
      article: true,
    });
    const response = await openAI.createCompletion({
      model: "text-davinci-002",
      prompt: `Generate a detailed professional, witty blog article on ${idea.article}.`,
      temperature: 0.8,
      max_tokens: 2500,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
      user: "user123456",
    });

    setLoading({
      ...loading,
      article: false,
    });
    setArticle(response.data.choices);
  };

  const blogTopics: string[] | undefined = useMemo(() => {
    if (!topics) return [];
    return topics[0].text?.split("\n").filter((topic) => topic.length > 0);
  }, [topics]);

  const blogOutline: string[] | undefined = useMemo(() => {
    if (!outline) return [];
    return outline[0].text?.split("\n").filter((outline) => outline.length > 0);
  }, [outline]);

  const blogIntro: string[] | undefined = useMemo(() => {
    if (!intro) return [];
    return intro[0].text?.split("\n").filter((intro) => intro.length > 0);
  }, [intro]);

  const blogOutro: string[] | undefined = useMemo(() => {
    if (!outro) return [];
    return outro[0].text?.split("\n").filter((outro) => outro.length > 0);
  }, [outro]);

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

      <div className="min-h-screen w-full py-5 px-2 text-black md:flex md:items-center md:justify-center">
        <div className="flex flex-col md:flex-row justify-center items-center md:gap-4">
          <div>
            <h1 className="m-0 text-6xl font-medium mb-2">
              BlogNLP{" "}
              <span role="img" aria-label="writing-hand">
                ✍️
              </span>
            </h1>
            <p className="w-full text-sm md:w-[500px] mb-5">
              BlogNLP is a free AI blog writing tool that helps you break your
              writer&apos;s block to create original content in a fraction of a
              time. Powered by Open AI&apos;s GPT-3.
            </p>
          </div>
          <main className="flex flex-col overflow-y-scroll w-full py-3 md:w-[650px] max-h-[650px]">
            <SectionForm
              title="Generate blog topics ideas 💡"
              value={idea.topic}
              onSubmit={(e) => generateBlogTopics(e)}
              onChange={(e) =>
                setIdea({
                  ...idea,
                  topic: e.target.value,
                })
              }
              isLoading={loading.topic}
              blogText={blogTopics}
            />
            <div className="border my-5"></div>
            <SectionForm
              title="Generate an outline to better organize your blog 📝"
              value={idea.outline}
              onSubmit={(e) => generateBlogOutline(e)}
              onChange={(e) =>
                setIdea({
                  ...idea,
                  outline: e.target.value,
                })
              }
              isLoading={loading.outline}
              blogText={blogOutline}
            />
            <div className="border my-5"></div>
            <SectionForm
              title="Generate a blog post intro paragraph ⚡️"
              value={idea.intro}
              onSubmit={(e) => generateBlogIntro(e)}
              onChange={(e) =>
                setIdea({
                  ...idea,
                  intro: e.target.value,
                })
              }
              isLoading={loading.intro}
              blogText={blogIntro}
            />
            <div className="border my-5"></div>
            <SectionForm
              title="Generate a blog post outro paragraph 🌗"
              value={idea.outro}
              onSubmit={(e) => generateBlogOutro(e)}
              onChange={(e) =>
                setIdea({
                  ...idea,
                  outro: e.target.value,
                })
              }
              isLoading={loading.outro}
              blogText={blogOutro}
            />
            <div className="border my-5"></div>
            <SectionForm
              title="Generate an attention-grabbing headline for your blog ⭐️"
              value={idea.headline}
              onSubmit={(e) => generateBlogHeadlines(e)}
              onChange={(e) =>
                setIdea({
                  ...idea,
                  headline: e.target.value,
                })
              }
              isLoading={loading.headline}
              blogText={blogHeadlines}
            />
            <div className="border my-5"></div>
            <SectionForm
              title="Generate a professionally written blog for inspiration ✨"
              value={idea.article}
              onSubmit={(e) => generateBlogArticle(e)}
              onChange={(e) =>
                setIdea({
                  ...idea,
                  article: e.target.value,
                })
              }
              isLoading={loading.article}
              blogText={blogArticle}
            />
          </main>
        </div>
      </div>

      <footer className="flex w-[15rem] mx-auto text-center justify-center space-y-2 flex-col items-center mb-10 text-xs">
        <span>
          Designed & built by
          <a
            target="_blank"
            rel="noreferrer"
            className="ml-1 underline"
            href="https://kelvinbrito.dev"
          >
            Kelvin Brito
          </a>
        </span>
        <span>
          Made with ❤️ with Next.js, TypeScript, Tailwind &{" "}
          <a target="_blank" rel="noreferrer" href="https://openai.com/api/">
            Open AI&apos;s GPT-3
          </a>
        </span>
        <span>{new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
