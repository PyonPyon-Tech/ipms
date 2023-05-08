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
        <table className="w-full table-auto border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600">Nama Hama</th>
              <th className="border border-slate-600">Status</th>
              <th className="border border-slate-600">Rekomendasi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
            <tr>
              <td className="border border-slate-600">{item.pest}</td>
              <td className="border border-slate-600">{item.status}</td>
              <td className="border border-slate-600">{item.recommendation}</td>
            </tr>
          ))}
          </tbody>
        </table>
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
