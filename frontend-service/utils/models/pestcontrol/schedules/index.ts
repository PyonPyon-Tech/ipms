import { OutletVisitations } from "../outlets";

// TODO: Gunakan ini untuk unmarshall schedules by period
// {{api_url}}/employees/technicians/2/schedules/3
// Lalu dipakai untuk form schedule mutations tanpa kalender
// Kalau sudah bisa Add, coba read dan update (hanya kalau rejected)
export class ScheduleForm {
  id!: number;
  period: any;
  comment!: string;
  isApproved!: number;
  visitations!: OutletVisitations[]; // Ini yang dipakai buat card

  static buildUpdateForm(obj: any): ScheduleForm {
    const form = new ScheduleForm();
    form.id = obj.id;
    form.period = obj.period;
    form.comment = obj.comment;
    form.isApproved = obj.isApproved;
    form.visitations = !!obj.visitations
      ? ScheduleForm.getVisitations(obj)
      : [];
    return form;
  }

  static buildCreateForm(outlets: any[]): ScheduleForm {
    const form = new ScheduleForm();
    form.comment = "";
    form.isApproved = -1;
    form.visitations = outlets.map((x) => {
      return {
        outletName: x.name,
        outletAddress: x.address,
        outletId: Number(x.id),
        count: x.count ?? 2,
        visitations: [
          {
            id: -1,
            date: "",
          },
          {
            id: -1,
            date: "",
          },
        ],
      };
    });
    return form;
  }

  static serializeUpdateForm(data: OutletVisitations[]): any[]{
    const result: any = [];
    data.forEach(outlet =>{
      outlet.visitations.forEach((visitation)=>{
        result.push(visitation)
      })
    })
    return result
  }
  static serializeCreateForm(data: OutletVisitations[]): any[] {
    const result: any = [];
    data.forEach((outlet) => {
      outlet.visitations.forEach((visitation) => {
        result.push({
          outlet: {
            id: outlet.outletId,
          },
          date: visitation.date,
        });
      });
    });
    return result;
  }

  static getVisitations(obj: any): OutletVisitations[] {
    const outletMap = new Map<number, boolean>();
    obj.visitations.forEach((visit: any) => {
      outletMap.set(Number(visit.outlet.id), true);
    });
    let outletIds = Array.from(outletMap.keys());
    // Simpan semua outlet unik.
    const newVisitations: OutletVisitations[] = [];
    outletIds.forEach((outletId) => {
      const sameOutlet = obj.visitations.filter(
        (v: any) => v.outlet.id == outletId
      ); // Lalu untuk setiap outlet, cari visitationnya
      newVisitations.push(new OutletVisitations(sameOutlet));
    });
    return newVisitations;
  }
}
