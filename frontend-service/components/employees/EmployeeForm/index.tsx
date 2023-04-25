import { Container } from "@components/general/Container";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { PATH_ROLES } from "@constants/roles";
import { Employee, EmployeeMutation } from "@models/pestcontrol/employee";
import {
  EmployeeFields,
  EmployeeFormFactory,
  EmployeeTechnicianFields,
} from "@models/pestcontrol/employee/form";

import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const EmployeeForm: FC<{ supervisors: Employee[] }> = ({
  supervisors,
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<EmployeeTechnicianFields>();
  const onSubmit = async (data: EmployeeTechnicianFields) => {
    let employee: EmployeeMutation | null = null;
    let role:string = "";
    if (Number(data.role) == 2) {
      role = "administrator"
      employee = EmployeeFormFactory.employeeMutationFromAdmin(data);
    } else if (Number(data.role) == 3) {
      if (!data.region) {
        toast.error("Anda Harus Isi Region");
        return;
      }
      role = "supervisor"
      employee = EmployeeFormFactory.employeeMutationFromSupervisor(data);
    } else if (Number(data.role) == 4) {
      if (!data.region || !data.supervisor) {
        toast.error("Anda Harus Isi Region dan Supervisor");
        return;
      }
      role = "technician"
      employee = EmployeeFormFactory.employeeMutationFromTechnician(data);
    } else {
      toast.error("Anda Belum Pilih Role");
      return;
    }
    AxiosClient.post(
      `${URL_EMPLOYEE}/${role}s`,
      employee
    )
      .then((response) => {
        console.log(employee);
        console.log(response.data);
        toast.success("Sukses membuat "+role, {
          duration: 5000
        });
        router.push(`/employees/${role}s/${response.data.id}`);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <Container className="justify-evenly gap-x-10">
      <img
        src="/icons/account.svg"
        className="w-1/4 max-w-[200px] md:max-w-[400px]"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="detail-form">
        <h5>Nama Karyawan</h5>
        <input required {...register("name")} />
        <h5>Username</h5>
        <input required {...register("username")} />
        <h5>Password</h5>
        <input required {...register("password")} />
        <h5>Kontak</h5>
        <input required {...register("contact")} />
        <h5>Alamat</h5>
        <input required {...register("address")} />
        <h5>{`Daerah Kerja (untuk Supervisor dan Technician)`}</h5>
        <input {...register("region")} />
        <h5>Tempat Tanggal Lahir</h5>
        <div className="flex max-w-[400px] justify-between gap-x-2 md:gap-x-4">
          <input required className="w-1/2" {...register("birthPlace")} />
          <input
            required
            className="w-1/2"
            {...register("birthDate")}
            type="date"
          />
        </div>
        <h5>Jenis Kelamin</h5>
        <select required {...register("gender")}>
          <option value="0">Peremuan</option>
          <option value="1">Laki-Laki</option>
        </select>
        <h5>Role</h5>
        <select required {...register("role")}>
          <option disabled selected>
            {" "}
            -- select an option --{" "}
          </option>
          <option value="4">Technician</option>
          <option value="3">Supervisor</option>
          <option value="2">Administrator</option>
        </select>
        <h5>{`Supervisor (untuk Technician)`}</h5>
        <select required {...register("supervisor")}>
          <option disabled selected>
            -- select an option --
          </option>
          {supervisors.map((supervisor) => (
            <option value={supervisor.id} key={"sup" + supervisor.id}>{`${
              supervisor.user.name
            } (${supervisor.region ?? "-"})`}</option>
          ))}
        </select>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-blue py-1 px-2 text-xs font-medium text-white md:py-2 md:px-3 md:text-sm"
        >
          Submit
        </button>
      </form>
    </Container>
  );
};

// defaultValues: {
//   name: data?.user.name,
//   username: data?.user.username,
//   password: "",
//   contact: data?.contact,
//   address: data?.address,
//   birthPlace: data?.birthLocation,
//   birthDate: new Date(data?.birthDate ?? new Date().toLocaleDateString())
//     .toISOString()
//     .split("T")[0],
//   gender: data?.gender,
//   role: data?.user.role ?? -1,
//   region: (data as EmployeeSupervisor)?.region ?? "",
//   supervisor: (data as EmployeeTechnician)?.supervisor?.id ?? "",
// },
