import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { AxiosClient, URL_CUSTOMER, URL_EMPLOYEE } from "@constants/api";
import { Outlet, OutletMutation } from "@models/customer/outlet";
import { OutletFields, OutletFormFactory } from "@models/customer/outlet/form";
import { EmployeeClass } from "@models/pestcontrol/employee";
import { EmployeeSupervisor } from "@models/pestcontrol/employee/form";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const OutletEditForm: FC<{data: Outlet}> = ({data})=>{
    const router = useRouter();
    const { register, handleSubmit } = useForm<OutletFields>({
        defaultValues: OutletFormFactory.createOutletFields(data)
    });

    const [ supervisors, setSupervisors ] = useState<EmployeeSupervisor[]>([]);

    useEffect(() => {
      AxiosClient.get(`${URL_EMPLOYEE}/supervisors`)
      .then((response) => {
        setSupervisors(response.data.map((x: any) => new EmployeeClass(x)));
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
    }, [router]);

    const onSubmit = async (data: OutletFields) => {
      let outlet = OutletFormFactory.outletMutationFromData(data);

      AxiosClient.put(
        `${URL_CUSTOMER}/${outlet.customer.id}/outlets/${router.query.id}`,
        outlet
      )
        .then((response) => {
          console.log(response.data);
          toast.success("Sukses ");
          router.push(`/customers/${outlet.customer.id}`);
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
          <h5>Nama Outlet</h5>
          <input required {...register("name")} />
          <h5>Daerah</h5>
          <input required {...register("region")} />
          <h5>Alamat</h5>
          <input required {...register("address")} />
          <h5>Supervisor</h5>
          <select {...register("supervisorId")}>
            { supervisors.map((supervisor) => {

                return <option value={supervisor.id} selected={supervisor.id === data.supervisor.id} key={supervisor.id}>{supervisor.user.name}</option>; 
            }) }
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