import { TechnicianOutletsDetail } from "@components/assignments/TechnicianOutletDetail";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import {
  TechnicianOutlets,
  TechnicianOutletsClass,
} from "@models/pestcontrol/employee/technician";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AssignmentTechnicianPage: NextPage = () => {
  const [data, setData] = useState<TechnicianOutlets>();
  const { user } = useAuth();
  const router = useRouter();
  console.log(data);
  useEffect(() => {
    if (!user || !router?.query.technician) return;
    async function loadTechnicianOutlets() {
      AxiosClient.get(`${URL_EMPLOYEE}/technicians/${router.query.technician}`)
        .then((response) => {
          console.log(response.data);
          setData(new TechnicianOutletsClass(response.data));
        })
        .catch((err) => {
          toast.error("Error");
          console.error(err);
        });
    }
    loadTechnicianOutlets();
  }, [user, router]);

  return (
    <div className="mb-4 w-full md:pt-0">
      {!!data && <TechnicianOutletsDetail data={data} />}
    </div>
  );
};
export default withAuth(withLayout(AssignmentTechnicianPage));
