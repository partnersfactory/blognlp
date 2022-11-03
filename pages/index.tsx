import React, { useState, useMemo } from "react";
import { Seo } from "../components/Seo";
import { CreateCompletionResponseChoicesInner } from "openai";
import { useOpenAI } from "../hooks/useOpenAI";

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
      max_tokens: 300,
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
      prompt: `Generate an engaging conclusion paragraph for a blog titled ${idea.outro}.`,
      temperature: 0.8,
      max_tokens: 300,
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
          <main className="flex flex-col overflow-y-scroll w-full md:w-[650px] max-h-[700px]">
            <div className="flex flex-col">
              <h2 className="px-4 mb-2 text-xl">
                Generate blog topics ideas 💡
              </h2>
              <form className="px-4" onSubmit={(e) => generateBlogTopics(e)}>
                <div className="flex space-x-5 items-center">
                  <input
                    className="border outline-none font-light rounded-md p-2 w-[340px] focus:border-blue-400 transition duration-300 ease-in-out"
                    placeholder="Enter a blog topic.."
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
                    <button
                      className="bg-gradient-to-r cursor-pointer from-indigo-500 via-purple-500 to-pink-500 text-white p-2 rounded-md w-[10rem] hover:scale-105 transition duration-300 ease-in-out disabled:opacity-25 disabled:scale-95"
                      disabled={!idea.topic}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
              <div className="px-4 mt-5">
                {blogTopics?.map((topic) => (
                  <p key={topic} className="text-sm font-medium mb-4">
                    {topic}
                  </p>
                ))}
              </div>
            </div>
            <div className="border my-5"></div>
            <div className="flex flex-col space-y-4">
              <h2 className="px-4 mb-2 text-xl">
                Generate an outline to better organize your blog 📝
              </h2>
              <form className="px-4" onSubmit={(e) => generateBlogOutline(e)}>
                <div className="flex space-x-5 items-center">
                  <input
                    className="border outline-none font-light rounded-md p-2 w-[340px] focus:border-blue-400 transition duration-300 ease-in-out"
                    placeholder="Enter a blog title/topic..."
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
                    <button
                      className="bg-gradient-to-r cursor-pointer from-indigo-500 via-purple-500 to-pink-500 text-white p-2 rounded-md w-[10rem] hover:scale-105 transition duration-300 ease-in-out disabled:opacity-25 disabled:scale-95"
                      disabled={!idea.outline}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
              <div className="px-4 mt-5">
                {blogOutline?.map((text) => (
                  <p key={text} className="text-sm font-medium mb-4">
                    {text}
                  </p>
                ))}
              </div>
            </div>
            <div className="border my-5"></div>
            <div className="flex flex-col space-y-4">
              <h2 className="px-4 mb-2 text-xl">
                Generate a blog post intro paragraph ⚡️
              </h2>
              <form className="px-4" onSubmit={(e) => generateBlogIntro(e)}>
                <div className="flex space-x-5 items-center">
                  <input
                    className="border outline-none font-light rounded-md p-2 w-[340px] focus:border-blue-400 transition duration-300 ease-in-out"
                    placeholder="Enter a blog title..."
                    value={idea.intro}
                    onChange={(e) =>
                      setIdea({
                        ...idea,
                        intro: e.target.value,
                      })
                    }
                  />
                  {loading.intro && <Loading />}
                  {!loading.intro && (
                    <button
                      className="bg-gradient-to-r cursor-pointer from-indigo-500 via-purple-500 to-pink-500 text-white p-2 rounded-md w-[10rem] hover:scale-105 transition duration-300 ease-in-out disabled:opacity-25 disabled:scale-95"
                      disabled={!idea.intro}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
              <div className="px-4 mt-5">
                {blogIntro?.map((text) => (
                  <p key={text} className="text-sm font-medium mb-4">
                    {text}
                  </p>
                ))}
              </div>
            </div>
            <div className="border my-5"></div>
            <div className="flex flex-col space-y-4">
              <h2 className="px-4 mb-2 text-xl">
                Generate a blog post outro paragraph 🌗
              </h2>
              <form className="px-4" onSubmit={(e) => generateBlogOutro(e)}>
                <div className="flex space-x-5 items-center">
                  <input
                    className="border outline-none font-light rounded-md p-2 w-[340px] focus:border-blue-400 transition duration-300 ease-in-out"
                    placeholder="Enter a blog title..."
                    value={idea.outro}
                    onChange={(e) =>
                      setIdea({
                        ...idea,
                        outro: e.target.value,
                      })
                    }
                  />
                  {loading.outro && <Loading />}
                  {!loading.outro && (
                    <button
                      className="bg-gradient-to-r cursor-pointer from-indigo-500 via-purple-500 to-pink-500 text-white p-2 rounded-md w-[10rem] hover:scale-105 transition duration-300 ease-in-out disabled:opacity-25 disabled:scale-95"
                      disabled={!idea.outro}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
              <div className="px-4 mt-5">
                {blogOutro?.map((text) => (
                  <p key={text} className="text-sm font-medium mb-4">
                    {text}
                  </p>
                ))}
              </div>
            </div>
            <div className="border my-5"></div>
            <div className="flex flex-col space-y-4">
              <h2 className="px-4 mb-2 text-xl">
                Generate an attention-grabbing headline for your blog ⭐️
              </h2>
              <form className="px-4" onSubmit={(e) => generateBlogHeadlines(e)}>
                <div className="flex space-x-5 items-center">
                  <input
                    className="border outline-none font-light rounded-md p-2 w-[340px] focus:border-blue-400 transition duration-300 ease-in-out"
                    placeholder="Enter a blog topic..."
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
                    <button
                      className="bg-gradient-to-r cursor-pointer from-indigo-500 via-purple-500 to-pink-500 text-white p-2 rounded-md w-[10rem] hover:scale-105 transition duration-300 ease-in-out disabled:opacity-25 disabled:scale-95"
                      disabled={!idea.headline}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
              <div className="px-4 mt-5">
                {blogHeadlines?.map((text) => (
                  <p key={text} className="text-sm font-medium mb-4">
                    {text}
                  </p>
                ))}
              </div>
            </div>
            <div className="border my-5"></div>
            <div className="flex flex-col space-y-4">
              <h2 className="px-4 mb-2 text-xl">
                Generate a professionally written blog for inspiration ✨
              </h2>
              <form className="px-4" onSubmit={(e) => generateBlogArticle(e)}>
                <div className="flex space-x-5 items-center">
                  <input
                    className="border font-light outline-none rounded-md p-2 w-[340px] focus:border-blue-400 transition duration-300 ease-in-out"
                    placeholder="Enter a blog title/topic..."
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
                    <button
                      className="bg-gradient-to-r cursor-pointer from-indigo-500 via-purple-500 to-pink-500 text-white p-2 rounded-md w-[10rem] hover:scale-105 transition duration-300 ease-in-out disabled:opacity-25 disabled:scale-95"
                      disabled={!idea.article}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
              <div className="px-5 mt-5">
                {blogArticle?.map((text) => (
                  <p key={text} className="text-sm font-medium mb-4">
                    {text}
                  </p>
                ))}
              </div>
            </div>
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

const Loading = () => {
  return (
    <div className="w-[10rem]" role="status">
      <svg
        aria-hidden="true"
        className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
