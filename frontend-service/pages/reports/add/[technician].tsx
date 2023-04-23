import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { CsrForm } from "@components/csr";
import { CsrFormProvider } from "@contexts/csrForm";
import { Title } from "@components/general/Title";

const AddReportPage: NextPage = () => {
    return (
        <CsrFormProvider>
            <Title title={"Membuat Laporan Treatment"} />
            <CsrForm />
        </CsrFormProvider>
    );
};
export default withAuth(withLayout(AddReportPage));
