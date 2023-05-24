import { TechnicianOutletsContainer } from "@components/assignments/TechnicianOutletsContainer";
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

export const AssignmentListPage: NextPage = () => {
  const [data, setData] = useState<TechnicianOutlets[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  console.log(data);
  useEffect(() => {
    if (!user) return;
    async function loadTechnicianOutlets() {
      AxiosClient.get(`${URL_EMPLOYEE}/supervisors/technicians`)
        .then((response) => {
          console.log(response.data);
          setData(response.data.map((x: any) => new TechnicianOutletsClass(x)));
        })
        .catch((err) => {
          toast.error("Error");
          console.error(err);
        });
    }
    if (user.role != 3) {
      router.push("/");
    } else {
      loadTechnicianOutlets();
    }
  }, [user]);

  return (
    <div className="mb-4 w-full md:pt-0">
      <TechnicianOutletsContainer data={data} />
    </div>
  );
};
export default withAuth(withLayout(AssignmentListPage));
