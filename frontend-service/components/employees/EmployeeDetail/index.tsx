import { Container } from "@components/general/Container";
import { ROLES } from "@constants/roles";
import { Employee } from "@models/pestcontrol/employee";
import { FC, use } from "react";

export const EmployeeDetail: FC<Employee> = ({
  address,
  birthDate,
  birthLocation,
  contact,
  gender,
  id,
  lastLogin,
  user: { isActive, name, role, username },
}) => {
  return (
    <Container>
      <img
        src="/icons/account.svg"
        className="w-1/4 max-w-[200px] md:max-w-[400px]"
      />
      <div className="mt-8 flex w-full flex-col justify-evenly md:mt-0 md:flex-row">
        <div className="employee-detail w-full md:w-2/5">
          <h5>Nama Karyawan</h5>
          <p>{name}</p>
          <h5>Username</h5>
          <p>{username}</p>
          <h5>Kontak</h5>
          <p>{contact}</p>
          <h5>Alamat</h5>
          <p>{address}</p>
          <h5>Tempat dan Tanggal Lahir</h5>
          <p>{`${birthLocation}, ${birthDate.toLocaleDateString()}`}</p>
        </div>
        <div className="employee-detail w-full md:w-2/5">
          <h5>Jenis Kelamin</h5>
          <p>{gender ? "Laki-Laki" : "Perempuan"}</p>
          <h5>Role</h5>
          <p>{ROLES[role]}</p>
          <h5>Status</h5>
          <p>{isActive ? "Aktif" : "Non-Aktif"}</p>
          <h5>Terakhir Login</h5>
          <p>{`${lastLogin.toLocaleString()}`}</p>
        </div>
      </div>
    </Container>
  );
};
