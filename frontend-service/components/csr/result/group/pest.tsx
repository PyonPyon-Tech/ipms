import { useCsrForm } from "@hooks/useCsrForm";
import { FC, useEffect, useRef, useState } from "react";
import { CsrResultGroupContainer } from "./container";
import { Thumbs } from "../item/thumbs";
import { CsrDetailPest } from "@models/report/CsrAnswer/CsrDetailPest";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CsrFormFindingPestDetail } from "../item/detailPest";

export const CsrResultPestFinding: FC<{data: CsrDetailPest[]}> = ({data})=> {
  return data.length != 0? (
    <div>
      <CsrResultGroupContainer
        key={"pest"}
        title="Temuan Hama"
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
        key={"pest"}
        title="Temuan Hama"
        section=""
      >
        <h2>Tidak ada temuan hama.</h2>
      </CsrResultGroupContainer>
    </div>
  );
};

const defaultPest = {};
