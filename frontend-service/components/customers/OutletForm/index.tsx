import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { AxiosClient, URL_CUSTOMER, URL_EMPLOYEE } from "@constants/api";
import { PATH_ROLES } from "@constants/roles";
import { useAuth } from "@hooks/useAuth";
import { Outlet, OutletMutation } from "@models/customer/outlet";
import { OutletFields, OutletFormFactory } from "@models/customer/outlet/form";
import { EmployeeClass } from "@models/pestcontrol/employee";
import { EmployeeSupervisor } from "@models/pestcontrol/employee/form";
import { AxiosError } from "axios";

import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const OutletForm: FC<{}> = ({}) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<OutletFields>();
    const [supervisors, setSupervisors] = useState<EmployeeSupervisor[]>([]);

    useEffect(() => {
        AxiosClient.get(`${URL_EMPLOYEE}/supervisors`)
            .then((response) => {
                setSupervisors(
                    response.data.map((x: any) => new EmployeeClass(x))
                );
            })
            .catch((err: AxiosError) => {
                console.log(err);
            });
    }, [router]);

    const onSubmit = async (data: OutletFields) => {
        let outlet: OutletMutation | null = null;

        outlet = OutletFormFactory.outletMutationFromData(data);
        outlet.customer.id = parseInt(router.query.id as string);
        const customerId = outlet.customer.id;

        AxiosClient.post(`${URL_CUSTOMER}/${customerId}/outlets`, outlet)
            .then((response) => {
                console.log(response.data);
                toast.success("Sukses membuat outlet", {
                    duration: 5000,
                });
                router.push(`/customers/${customerId}`);
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
                <h5>Nama Outlet</h5>
                <input required {...register("name")} />
                <h5>Daerah</h5>
                <input required {...register("region")} />
                <h5>Alamat</h5>
                <input required {...register("address")} />
                <h5>Supervisor</h5>
                <select {...register("supervisorId")}>
                    {supervisors.map(({ id, user: { name }, region }) => (
                        <option
                            value={id}
                            key={id}
                        >{`${name} (${region})`}</option>
                    ))}
                </select>

        <Button
            action={{
                name: `Submit`,
                submit: true,
                func: () => {}
            }}
        ></Button>
      </form>
    </Container>
  );
};
