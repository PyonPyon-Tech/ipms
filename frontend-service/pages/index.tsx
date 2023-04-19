import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { Button } from "@components/general/Button";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
    return (
        <div className="mb-4 w-full pr-8 md:pr-12 md:pt-0">
            <Button
                className='bg-orange'
                action={{
                    name: "Tambah Chemical Baru",
                    submit: true,
                    func:() => router.push('/inventories/add'),
                }}
            ></Button>
        </div>
    );
};
export default withAuth(withLayout(Home));
