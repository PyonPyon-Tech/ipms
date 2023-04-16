import { EmployeeContainer } from "@components/employees/EmployeeList";
import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import Breadcrumbs from "@components/layout/breadcrumbs";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { filterData, filterDataNested } from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Employee, EmployeeClass } from "@models/pestcontrol/employee";
import { User } from "@models/user";
import { fontSize } from "@mui/system";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SearchEmployees: NextPage = () => {
    return (
        <div className="w-full p-8 md:p-12 md:pt-0">
            <Breadcrumbs/>
            <section>
                <Title
                    title="Stok Chemical"
                    action={{
                        name: "Tambah Barang Baru",
                        path: `/inventory/kelola/tambah`,
                    }}
                />
            </section>
            <div>
                <Search
                    setSearchTerm={undefined}
                    placeholder={"Cari pestisida"}
                ></Search>{" "}
            </div>
            {/* Start card */}
            <div
                style={{ boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)" }}
                className="flex rounded-[10px] p-4 align-middle justify-between mt-4 flex-wrap"
            >
                <div>
                    <div className="pb-1 text-xl text font-bold text max-lg:text-center">
                        <h5>Ecolab Sigla R-600 Multipurpose Cleaner MPC</h5>
                    </div>
                    <div className="text-xs max-lg:text-center">
                        <h5>Dosis: 175 ml cairan per 3,75 liter air </h5>
                    </div>
                </div>

                <div className="flex gap-2 items-center max-lg:mx-auto max-lg:pt-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-dark">
                        <div>
                            <img src="/icons/plus.svg" />
                        </div>
                    </div>
                    <div>
                        <h5 className="text-xl font-bold"> 74 </h5>
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-orange">
                        <div>
                            <img src="/icons/minus.svg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(withLayout(SearchEmployees));
