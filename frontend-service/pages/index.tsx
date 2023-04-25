import { Title } from "@components/general/Title";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="mb-10">
      <Title title="Dashboard"></Title>
      <div className="mb-4 flex w-full flex-col gap-4">
        <div className="flex h-[200px] w-full justify-around gap-4 rounded-md bg-coral-light p-4">
          <div className="h-full w-full rounded-md bg-coral-light">
            <p className="font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nam
              animi perspiciatis aliquam, rerum quo, tempore qui ipsum quasi
              fuga magni alias architecto assumenda recusandae adipisci fugit
              iusto placeat cum? 
            </p>
          </div>
          <div className="h-full w-full rounded-md bg-coral"></div>
        </div>
      </div>
      <div className="mb-4 flex w-full gap-4">
        <div className="h-[200px] w-full rounded-md bg-teal-dark"></div>
        <div className="h-[200px] w-full rounded-md bg-blue-dark"></div>
        <div className="h-[200px] w-full rounded-md bg-orange-dark"></div>
      </div>
      <div className="mb-4 flex w-full gap-4">
        <div className="h-[200px] w-full rounded-md bg-orange-light"></div>
        <div className="h-[200px] w-full rounded-md bg-teal"></div>
      </div>
    </div>
  );
};
export default withAuth(withLayout(Home));
