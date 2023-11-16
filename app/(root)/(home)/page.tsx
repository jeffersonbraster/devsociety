import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

const duasHorasDepois = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
const questions = [
  {
    _id: "1",
    title: "Como fazer uma pergunta?",
    tags: [
      { _id: "1", name: "mysql" },
      { _id: "2", name: "plsql" },
    ],
    author: {
      _id: "authorId1",
      name: "Jefferson Brandão",
      picture: "url/to/picture1",
    },
    upvotes: 10,
    views: 15000,
    answers: [{}, {}], // assuming each answer is an object, adjust accordingly
    createdAt: duasHorasDepois,
  },
  {
    _id: "2",
    title: "Como colocar uma div no centro",
    tags: [
      { _id: "3", name: "html" },
      { _id: "4", name: "css" },
    ],
    author: {
      _id: "authorId2",
      name: "Jefferson Brandão",
      picture: "url/to/picture2",
    },
    upvotes: 15,
    views: 120,
    answers: [{}, {}, {}], // assuming each answer is an object, adjust accordingly
    createdAt: new Date("2023-09-01T12:00:00.000Z"),
  },
];

const Home = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Todas as Perguntas</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Faça uma Pergunta
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Pesquisar por perguntas"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="Sem Perguntas no Momento"
            description=" Seja o primeiro a quebrar o silêncio! 🚀 Faça uma pergunta e inicie uma
          discussão. Sua pergunta pode ser a próxima grande coisa com a qual
          outras pessoas aprenderão. Não perca tempo!"
            link="/ask-question"
            linkTitle="Faça uma Pergunta"
          />
        )}
      </div>
    </>
  );
};

export default Home;
