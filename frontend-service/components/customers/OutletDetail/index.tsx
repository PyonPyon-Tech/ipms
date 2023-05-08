import { Container } from "@components/general/Container";
import { ROLES } from "@constants/roles";
import { Outlet } from "@models/customer/outlet";
import { FC, use } from "react";

export const OutletDetail: FC<Outlet> = ({
  id,
  name,
  address,
  region,
  supervisor: { id: supervisorId, user: { name: supervisorName } },
  technician,
}) => {
  const technicianId = technician?.id;
  const technicianName = technician?.user.name;
  return (
    <Container>
      <img
        src="/icons/account.svg"
        className="w-1/4 min-w-[120px] md:max-w-[400px]"
      />
      <div>
        <div className="customer-detail">
          <h1>{name}</h1>
        </div>
        <div className="mt-8 flex w-full flex-col md:mt-0 md:flex-row">
          <div className="customer-detail w-full md:w-2/5 md:mr-10">
            <h5>Alamat</h5>
            <p>{address}</p>
            <h5>Daerah</h5>
            <p>{region}</p>
          </div>
          <div className="customer-detail w-full md:w-3/5">
            <h5>Supervisor</h5>
            <p>{supervisorName}</p>
            <h5>Teknisi</h5>
            <p>{technicianName ?? "-"}</p>
          </div>
        </div>
      </div>
    </Container>
    
  );
};
