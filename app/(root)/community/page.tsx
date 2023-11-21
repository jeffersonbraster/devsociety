import Link from "next/link";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { UserFilters } from "@/constants/filters";
import UserCard from "@/components/cards/UserCard";
import { getAllUsers } from "@/lib/actions/user.action";

const Community = async () => {
  const result = await getAllUsers({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Todos os Usuários</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Pesquisar pela comunidade"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>Sem usuários no momento</p>

            <Link href="/sing-up" className="mt-3 font-bold text-accent-blue">
              Seja o primeiro a embarcar nessa comunidade!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Community;
