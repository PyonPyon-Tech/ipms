import { useCsrForm } from "@hooks/useCsrForm";
import { FC } from "react";
import { CsrResultGroupContainer } from "./container";
import { useFieldArray } from "react-hook-form";
import { CsrFormPesticideUsageDetail } from "../item/pesticideUsage";
import { CsrPesticideUsage } from "@models/report/CsrAnswer/CsrPesticideUsage";

export const CsrResultPesticideUsage: FC<{data: CsrPesticideUsage[]}> = ({data})=> {
  return data.length != 0? (
    <div>
      <CsrResultGroupContainer
        title="Penggunaan Pestisida"
        section=""
      >
        {data.map((item, index) => (
          <table className="w-full table-auto border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600">Nama Pestisida</th>
              <th className="border border-slate-600">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
            <tr>
              <td className="border border-slate-600">{item.pesticide.name}</td>
              <td className="border border-slate-600">{item.amount}</td>
            </tr>
          ))}
          </tbody>
        </table>
        ))}
      </CsrResultGroupContainer>
    </div>
  ): (
    <div>
      <CsrResultGroupContainer
        title="Penggunaan Pestisida"
        section=""
      >
        <h2>Tidak ada penggunaan pestisida.</h2>
      </CsrResultGroupContainer>
    </div>
  );
};