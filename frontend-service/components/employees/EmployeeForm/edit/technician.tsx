import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { Employee, EmployeeClass } from "@models/pestcontrol/employee";
import {
    EmployeeFormFactory,
    EmployeeSupervisorFields,
    EmployeeTechnicianFields,
} from "@models/pestcontrol/employee/form";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const EmployeeTechnicianEditForm: FC<{ data: Employee }> = ({
    data,
}) => {
    const router = useRouter();
    const [supervisor, setsupervisor] = useState<Employee[]>([]);
    const { register, handleSubmit } = useForm<EmployeeTechnicianFields>({
        defaultValues: EmployeeFormFactory.createTechnicianFields(data),
    });
    const onSubmit = async (data: EmployeeTechnicianFields) => {
        let employee = EmployeeFormFactory.employeeMutationFromTechnician(data);
        console.log(employee);
        AxiosClient.put(
            `${URL_EMPLOYEE}/technicians/${router.query.id}`,
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
    useEffect(() => {
        async function loadSupervisor() {
            AxiosClient.get(`${URL_EMPLOYEE}/supervisors`).then((response) =>
                setsupervisor(
                    response.data.map((sup: any) => new EmployeeClass(sup))
                )
            );
        }
        loadSupervisor();
    }, []);
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
                <input {...register("password")} />
                <h5>Kontak</h5>
                <input required {...register("contact")} />
                <h5>Alamat</h5>
                <input required {...register("address")} />
                <h5>{`Daerah Kerja (untuk Supervisor dan Technician)`}</h5>
                <input {...register("region")} />
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
                <select hidden disabled required {...register("role")}>
                    <option value="4">Technician</option>
                </select>
                {supervisor.length > 0 && (
                    <>
                        <h5>Supervisor</h5>
                        <select required {...register("supervisor")}>
                            {supervisor.map(
                                ({ id, user: { name }, region }) => {
                                    return (
                                        <option
                                            key={"supv" + id}
                                            value={id}
                                        >{`${name} (${region})`}</option>
                                    );
                                }
                            )}
                        </select>
                    </>
                )}
                <h5>Status</h5>
                <select required {...register("isActive")}>
                    <option value="0">Non-Aktif</option>
                    <option value="1">Aktif</option>
                </select>
                <Button action={{ name: "Simpan", submit: true }}></Button>
            </form>
        </Container>
    );
};
