import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { Employee, EmployeeMutation } from "@models/pestcontrol/employee";
import {
    EmployeeAdministratorFields,
    EmployeeFormFactory,
} from "@models/pestcontrol/employee/form";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const EmployeeAdminEditForm: FC<{ data: Employee }> = ({ data }) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<EmployeeAdministratorFields>({
        defaultValues: EmployeeFormFactory.createAdminFields(data),
    });
    const onSubmit = async (data: EmployeeAdministratorFields) => {
        let employee = EmployeeFormFactory.employeeMutationFromAdmin(data);
        console.log(employee);
        AxiosClient.put(
            `${URL_EMPLOYEE}/administrators/${router.query.id}`,
            employee
        )
            .then((response) => {
                console.log(response.data);
                toast.success("Sukses ");
                router.push("/employees");
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
                className="w-1/4 min-w-[120px] md:max-w-[400px]"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="detail-form">
                <h5>Nama Karyawan</h5>
                <input required {...register("name")} />
                <h5>Username</h5>
                <input disabled className="bg-gray-300" {...register("username")} />
                <h5>Password</h5>
                <input {...register("password")} />
                <h5>Kontak</h5>
                <input required {...register("contact")} />
                <h5>Alamat</h5>
                <input required {...register("address")} />
                <h5>Tempat Tanggal Lahir</h5>
                <div className="flex max-w-[400px] justify-between gap-x-2 md:gap-x-4">
                    <input
                        required
                        className="w-1/2"
                        {...register("birthPlace")}
                    />
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
                <h5>Status</h5>
                <select required {...register("isActive")}>
                    <option value="0">Non-Aktif</option>
                    <option value="1">Aktif</option>
                </select>
                <select hidden disabled required {...register("role")}>
                    <option value="2">Administrator</option>
                </select>
                <Button
                    action={{ name: "Simpan", submit: true }}
                ></Button>
            </form>
        </Container>
    );
};
