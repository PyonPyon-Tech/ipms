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
          <h2>test</h2>
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
