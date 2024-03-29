import { Container } from "@components/general/Container";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { Outlet, OutletClass } from "@models/customer/outlet";
import { TechnicianOutlets } from "@models/pestcontrol/employee/technician";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { TechnicianOutletsDetailForm } from "./TechnicianOutletDetailForm";
import { Button } from "@components/general/Button";

export const TechnicianOutletsDetail: FC<{ data: TechnicianOutlets }> = ({
  data,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [allOutlets, setAllOutlets] = useState<Outlet[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    async function loadAllOutlet() {
      AxiosClient.get(`${URL_EMPLOYEE}/supervisors/outlets`).then(
        (response) => {
          setAllOutlets(
            response.data.map((outlet: any) => new OutletClass(outlet))
          );
        }
      );
    }
    loadAllOutlet();
  }, [user]);

  const [toBeSavedOutlet, setToBeSavedOutlet] = useState<Outlet[]>([]);

  const updateOutlet = async () => {
    const id = router?.query?.technician;
    if (!id || toBeSavedOutlet.length == 0) return;
    AxiosClient.put(
      `${URL_EMPLOYEE}/technicians/${id}/outlets`,
      toBeSavedOutlet
    )
      .then((response) => {
        toast.success("Berhasil Diupdate");
        console.log(response.data);
        setEditMode(false);
        router.push(`/assignments/${id}`);
      })
      .catch((err) => {
        toast.error("Ada Masalah");
        console.log(err);
      });
  };

  return (
    <Container className="md:flex-col">
      <div className="w-full">
        <div className="flex items-center gap-x-2 md:gap-x-4">
          <img
            className="h-8 w-8 sm:h-8 sm:w-8 md:h-12 md:w-12"
            src="/icons/person.svg"
          />
          <div className="">
            <h5 className="text-sm font-bold md:mb-1 md:text-xl">
              {data.user.name}
            </h5>
            <div>
              <table className="table-auto text-xs font-medium md:text-sm">
                <tbody>
                  <tr>
                    <td className="pr-4">Daerah Kerja</td>
                    <td className="pr-4">{`: ${data.region}`}</td>
                  </tr>
                  <tr>
                    <td className="pr-4">Kontak</td>
                    <td className="pr-4">{`: ${data.contact}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 mb-4 flex w-full items-start justify-between">
        <h5 className="text-sm font-bold md:text-[20px]">
          Outlet Yang Dipegang
        </h5>
        {editMode ? (
          <div className="flex gap-x-3 text-sm md:text-base">
            <Button
              className="bg-coral"
              action={{
                name: "Batalkan",
                func: () => setEditMode(false),
              }}
            ></Button>
            <Button
              className="bg-teal-dark"
              action={{
                name: "Simpan",
                func: updateOutlet,
              }}
            ></Button>
          </div>
        ) : (
          <Button
            action={{
              name: "Edit Outlet",
              func: () => setEditMode(true),
            }}
          ></Button>
        )}
      </div>
      {!editMode ? (
        <Table {...data} />
      ) : (
        <TechnicianOutletsDetailForm
          setSaved={setToBeSavedOutlet}
          before={data.outlets}
          allOutlets={allOutlets}
        />
      )}
    </Container>
  );
};

const Table = (data: TechnicianOutlets) => {
  return (
    <table className="w-full table-auto text-left">
      <thead>
        <tr className="text-sm font-semibold md:text-base">
          <th className="w-5/12 pb-2">Nama Outlet</th>
          <th className="w-7/12 pb-2">Alamat</th>
        </tr>
      </thead>
      <tbody className="text-xs md:text-sm">
        {data.outlets.map((outlet) => {
          return (
            <tr key={outlet.name + "k"}>
              <td className="py-1.5 font-medium">{outlet.name}</td>
              <td className="py-1.5">{outlet.address}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
