import { useCsrForm } from "@hooks/useCsrForm";
import { FC } from "react";
import { CsrFindingAreaDetail } from "../item/detailAreaResult";
import { CsrResultGroupContainer } from "./container";
import { CsrDetailArea } from "@models/report/CsrAnswer/CsrDetailArea";

export const CsrResultAreaFinding: FC<{data: CsrDetailArea[][]}> = ({data}) => {
  return (
    <div>
      {data.map((csrAreaDetail, index) => {
        console.log(csrAreaDetail);
        return (
          // <div></div>
          <CsrResultGroupContainer key={`area-${csrAreaDetail[0].area.id}`} title={csrAreaDetail[0].area.area} section={String.fromCharCode(index + 65)}>
            {csrAreaDetail.map((item) => {
              console.log(csrAreaDetail[0].area.area);
              return (
                <CsrFindingAreaDetail
                  key={`area-detail-${item.id}`}
                  {...item}
                  area={{
                    id: csrAreaDetail[0].area.id,
                    area: csrAreaDetail[0].area.area,
                  }}
                />
              );
            })}
          </CsrResultGroupContainer>
        );
      })}
    </div>
  );
};
