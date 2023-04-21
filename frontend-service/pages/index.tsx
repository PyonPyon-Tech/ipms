import Breadcrumbs from "@components/layout/breadcrumbs";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { ReactElement, useState } from "react";

const Home: NextPage = () => {
  const [amount, setAmount] = useState<number>();
  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <Breadcrumbs></Breadcrumbs>
    </div>
  );
};
export default withAuth(withLayout(Home));
