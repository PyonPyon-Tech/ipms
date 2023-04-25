import { Pest } from "@models/pestcontrol/Pest";

export const validateInventoryForm = (data: any, pestData: Pest[]) => {
  const targetArray: any[] = data.target;
  const duplicatePest: any[] = targetArray.filter(
    (item1: any, index: any) => targetArray.findIndex((item2: any) => item2.pestId == item1.pestId) != index
  );
  console.log(duplicatePest);
  if (duplicatePest.length > 0) {
    return `Hama "${pestData.find((p) => p.id == Number(duplicatePest[0].pestId))?.name}" hanya bisa dipilih sekali`;
  }
  return "";
};
export const formatInventoryForm = (data: any, pestData: Pest[]) => {
  const targetArray: any[] = data.target;
  const targets: string = targetArray
    .map((x: any) =>
      `${pestData.find((p) => p.id == Number(x.pestId))?.name} (${x.dosage.replace(/[()]/g, "")})`.replace(/,/g, ".")
    )
    .join(", ");
  const targetPest = targetArray.map((x: any) => {
    return {
      id: Number(x.pestId),
    };
  });
  return [targets, targetPest];
};
