import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { Button } from "@components/general/Button";

const Home: NextPage = () => {
    return (
        <div className="mb-4 w-full pr-8 md:pr-12 md:pt-0">
            <Button
                action={{
                    name: "Tambah Chemical Baru",
                    path: `/inventories/add`,
                    bgColor: 'coral',
                    submit: true
                }}
            ></Button>
        </div>
    );
};
export default withAuth(withLayout(Home));
