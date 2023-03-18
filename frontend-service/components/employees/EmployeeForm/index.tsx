import { Container } from "@components/general/Container";
import {
  Employee,
  EmployeeFields,
  Employees,
  EmployeeSupervisor,
  EmployeeTechnician,
} from "@models/pestcontrol/employee";
import { FC } from "react";
import { useForm } from "react-hook-form";

export const EmployeeForm: FC<{ data: Employees | null }> = ({ data }) => {
  const isAForm = !data;
  const { register, handleSubmit } = useForm<EmployeeFields>({
    defaultValues: {
      name: data?.user.name,
      username: data?.user.username,
      password: "",
      contact: data?.contact,
      address: data?.address,
      birthPlace: data?.birthLocation,
      birthDate: new Date(data?.birthDate ?? new Date().toLocaleDateString())
        .toISOString()
        .split("T")[0],
      gender: data?.gender,
      role: data?.user.role ?? -1,
      region: (data as EmployeeSupervisor)?.region ?? "",
      supervisor: (data as EmployeeTechnician)?.supervisor ?? "",
    },
  });
  const onSubmit = async (data: EmployeeFields) => console.log(data); //TODO: this. Mestinya ada confirmation dialog tapi ngga usah dulu
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
          <option value="4">Technician</option>
          <option value="3">Supervisor</option>
          <option value="2">Administrator</option>
        </select>
        <h5>{`Supervisor (untuk Technician)`}</h5>
        <select defaultValue={"-1"} required {...register("supervisor")}>
          <option value="-1">Tidak Ada</option>
          <option value="1">Supervisor X</option>
          <option value="2">Supervisor Y</option>
        </select>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-blue py-1 px-2 text-xs font-medium text-white md:py-2 md:px-3 md:text-sm"
        >
          Submit
        </button>
      </form>
    </Container>
  );
};
