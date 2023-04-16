import { Layout } from "@components/layout";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { ReactElement, useState } from "react";
import Breadcrumbs from "components/layout/breadcrumbs";

const Home: NextPage = () => {
  const [amount, setAmount] = useState<number>();
  return (
    <div className="">
      <Breadcrumbs />
      <input type="number" value={amount} min={0} onChange={(e) => setAmount(Number(e.target.value))} />
      <h1>Hai Hia</h1>
    </div>
  );
};
export default withAuth(withLayout(Home));
