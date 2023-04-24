import { Tag } from "@components/general/Tag";
import { ROLES } from "@constants/roles";
import { Employee } from "@models/pestcontrol/employee";
import { useRouter } from "next/router";
import { FC } from "react";

export const EmployeeCard: FC<Employee> = ({
    id,
    contact,
    address,
    user: { username, role, isActive, name },
}) => {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                router.push(
                    `/employees/${
                        role == 2
                            ? "administrators"
                            : role == 3
                            ? "supervisors"
                            : "technicians"
                    }/${id}`
                );
            }}
            className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-md py-2 px-4 shadow-basic md:py-4 md:px-12"
        >
            <div className="flex items-center gap-x-3 sm:gap-x-6 md:gap-x-8">
                <img
                    className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16"
                    src="/icons/person.svg"
                />
                <div className="">
                    <h5 className="text-sm font-bold md:mb-1 md:text-xl">
                        {name}
                    </h5>
                    <div>
                        <table className="table-auto text-xs font-medium md:text-sm">
                            <tbody>
                                <tr>
                                    <td className="pr-4">
                                        Username: {username}
                                    </td>
                                    <td className="hidden md:table-cell">
                                        Kontak: {contact}{" "}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pr-4">
                                        Role: {ROLES[role]}
                                    </td>
                                    <td className="hidden md:table-cell">
                                        Address: {address}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Tag isActive={isActive}></Tag>
        </div>
    );
};
