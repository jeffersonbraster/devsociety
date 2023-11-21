import { auth } from "@clerk/nextjs";
import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { IQuestion } from "@/database/question.model";

const Collection = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">
        Suas Perguntas Favoritas
      </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Pesquisar por perguntas"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: IQuestion) => (
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
            title="Sem Perguntas Favoritas no Momento"
            description=" Favorite suas perguntas favoritas que lhe ajudarão no futuro! 🚀 Tem perguntas respondidas que sempre ajudam em varios casos de uso nos seus projetos e é importante encontrar de uma maneira facil."
            link="/"
            linkTitle="Todas as Perguntas"
          />
        )}
      </div>
    </>
  );
};

export default Collection;
