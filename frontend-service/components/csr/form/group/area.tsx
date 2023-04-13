import { useCsrForm } from "@hooks/useCsrForm";
import { FC } from "react";
import { CsrFormFindingAreaDetail } from "../item/detailArea";
import { CsrFormGroupContainer } from "./container";

export const CsrFormAreaFinding: FC = () => {
  const { initialData } = useCsrForm();
  if (!initialData) return <div></div>;
  return (
    <div>
      {initialData.areas.map(({ area, id, findings }, index) => {
        return (
          <CsrFormGroupContainer key={`area-${id}`} title={area} section={String.fromCharCode(index + 65)}>
            {findings?.map((item) => {
              return <CsrFormFindingAreaDetail key={`area-detail-${item.id}`} {...item} />;
            })}
          </CsrFormGroupContainer>
        );
      })}
    </div>
  );
};
