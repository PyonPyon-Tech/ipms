import { Container } from "@components/general/Container";
import { ROLES } from "@constants/roles";
import { Customer } from "@models/customer/customer";
import { FC, use } from "react";

export const CustomerDetail: FC<Customer> = ({
  id,
  user: { isActive, name, role, username },
}) => {
  return (
    <Container>
      <img
        src="/icons/account.svg"
        className="w-1/4 max-w-[200px] md:max-w-[400px]"
      />
      <div>
        <div className="customer-detail">
          <h1>{name} <span className="text-gray-500">(CUST-{String(id).padStart(3, '0')})</span></h1>
        </div>
        <div className="mt-8 flex w-full flex-col md:mt-0 md:flex-row">
          <div className="customer-detail w-full md:w-2/5 md:mr-10">
            <h5>Username</h5>
            <p>{username}</p>
            <h5>Role</h5>
            <p>{ROLES[role]}</p>
            <h5>Kontak</h5>
            <p>+6213213213 (dummy)</p>
          </div>
          <div className="customer-detail w-full md:w-3/5">
            <h5>Jumlah Kunjungan</h5>
            <p>2x Sebulan (dummy)</p>
            <h5>Kontrak</h5>
            <p>Jan 2022 - Jan 2023 (dummy)</p>
            <h5>Status</h5>
            <p>{isActive ? "Aktif" : "Non-Aktif"}</p>
          </div>
        </div>
      </div>
    </Container>
    
  );
};
