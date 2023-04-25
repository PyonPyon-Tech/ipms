import { useAuth } from "@hooks/useAuth";
import { NavigationCardProps } from "@type/navigationCardProps";

export const PATH_ROLES = ["customers", "managers", "administrators", "supervisors", "technicians"]; // ini versi english plural buat routes
export const ROLES_ENGLISH = ["customer", "manager", "administrator", "supervisor", "technician"];
export const ROLES = ["Customer", "Manajer", "Administrator", "Supervisor", "Teknisi"];

export const NAVCARDS: NavigationCardProps[][] = [
  [
    { name: "Dashboard", path: "/" },
    { name: "Laporan Treatment", path: "/" },
    { name: "Jadwal Treatment", path: "/" },
    { name: "Beri Feedback", path: "/" },
  ], // customer
  [
    { name: "Dashboard", path: "/" },
    { name: "Akun Karyawan", path: "/employees" },
    { name: "Akun Customer", path: "/customers" },
    { name: "Buat Laporan Treatment", path: "/" },
    { name: "Lihat Laporan Treatment", path: "/reports" },
    { name: "Lihat Jadwal Treatment", path: "/schedules" },
    { name: "Realokasi Jadwal Treatment", path: "/" },
    { name: "Supervisor Outlet", path: "/" },
    { name: "Stok Chemical", path: "/inventories" },
    { name: "Lihat Feedback", path: "/" },
  ], // manager
  [
    { name: "Dashboard", path: "/" },
    { name: "Akun Customer", path: "/customers" },
    { name: "Lihat Laporan Treatment", path: "/reports" },
    { name: "Lihat Jadwal Treatment", path: "/" },
    { name: "Stok Chemical", path: "/inventories" },
    { name: "Lihat Feedback", path: "/" },
  ], // administrator
  [
    { name: "Dashboard", path: "/" },
    { name: "Penanggung Jawab Outlet", path: "/assignments" },
    { name: "Buat Laporan Treatment", path: "/" },
    { name: "Lihat Laporan Treatment", path: "/reports" },
    { name: "Lihat Jadwal Treatment", path: "/schedules" },
    { name: "Setujui Jadwal Treatment", path: "/schedules/approve" },
    { name: "Realokasi Jadwal Treatment", path: "/schedules/allocate" },
    { name: "Stok Chemical", path: "/inventories" },
    { name: "Lihat Feedback", path: "/" },
  ], // supervisor
  [
    { name: "Dashboard", path: "/" },
    { name: "Buat Laporan Treatment", path: "/" },
    { name: "Lihat Laporan Treatment", path: "/reports" },
    { name: "Lihat Jadwal Treatment", path: "/" },
    { name: "Ajukan Jadwal Treatment", path: "/" },
    { name: "Realokasi Jadwal Treatment", path: "/" },
    { name: "Stok Chemical Saya", path: "/inventories/out" },
    { name: "Lihat Umpan Balik", path: "/" },
  ], // teknisi
];
