import { useAuth } from "@hooks/useAuth";
import { NavigationCardProps } from "@type/navigationCardProps";

export const PATH_ROLES = ["customers", "managers", "administrators", "supervisors", "technicians"]; // ini versi english plural buat routes
export const ROLES_ENGLISH = ["customer", "manager", "administrator", "supervisor", "technician"];
export const ROLES = ["Customer", "Manajer", "Administrator", "Supervisor", "Teknisi"];

export const NAVCARDS: NavigationCardProps[][] = [
  [
    { name: "Dashboard", path: "/" },
    { name: "Notifikasi", path: `/notifications` },
    { name: "Laporan Treatment", path: "/reports" },
    { name: "Komplain", path: "/complaints" },
    // { name: "Jadwal Treatment", path: "/" },
    // { name: "Beri Feedback", path: "/" },
  ], // customer
  [
    { name: "Dashboard", path: "/" },
    { name: "Notifikasi", path: `/notifications` },
    { name: "Karyawan", path: "/employees" },
    { name: "Customer & Outlet", path: "/customers" },
    // { name: "Buat Laporan Treatment", path: "/" },
    { name: "Laporan Treatment", path: "/reports" },
    // { name: "Lihat Jadwal Treatment", path: "/schedules" }, ?? Butuh ngga sih??
    // { name: "Realokasi Jadwal Treatment", path: "/" },
    // { name: "Penugasan Outlet", path: "/assignments" },
    { name: "Stok Chemical", path: "/inventories" },
    { name: "Komplain", path: "/complaints" },
    // { name: "Lihat Feedback", path: "/" },
  ], // manager
  [
    { name: "Dashboard", path: "/" },
    { name: "Notifikasi", path: `/notifications` },
    { name: "Karyawan", path: "/employees" },
    { name: "Customer & Outlet", path: "/customers" },
    { name: "Laporan Treatment", path: "/reports" },
    { name: "Stok Chemical", path: "/inventories" },
    { name: "Komplain", path: "/complaints" },
    // { name: "Penugasan Outlet", path: "/assignments" },
    // { name: "Lihat Feedback", path: "/" },
  ], // administrator
  [
    { name: "Dashboard", path: "/" },
    { name: "Notifikasi", path: `/notifications` },
    { name: "Penugasan Outlet", path: "/assignments" },
    // { name: "Buat Laporan Treatment", path: "/" },
    { name: "Laporan Treatment", path: "/reports" },
    { name: "Jadwal Teknisi", path: "/schedules" },
    { name: "Menyetujui Jadwal Teknisi", path: "/schedules/approve" },
    { name: "Mengganti Kunjungan Teknisi", path: "/schedules/allocate" },
    { name: "Komplain", path: "/complaints" },
    // { name: "Stok Chemical", path: "/inventories" },
    // { name: "Lihat Feedback", path: "/" },
  ], // supervisor
  [
    { name: "Dashboard", path: "/" },
    { name: "Notifikasi", path: `/notifications` },
    { name: "Buat Laporan Treatment", path: "/reports/add" }, // done
    { name: "Lihat Laporan Treatment", path: "/reports" },
    { name: "Jadwal Treatment", path: "/schedules/propose" }, // done
    // { name: "Realokasi Jadwal Treatment", path: "/" },
    { name: "Stok Chemical Saya", path: "/inventories/out" },
    { name: "Komplain", path: "/complaints" },
    // { name: "Lihat Umpan Balik", path: "/" },
  ], // teknisi
];
