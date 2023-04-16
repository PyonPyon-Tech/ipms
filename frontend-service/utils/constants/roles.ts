import { NavigationCardProps } from "@type/navigationCardProps";

export const PATH_ROLES = [
  "customers",
  "managers",
  "administrators",
  "supervisors",
  "technicians"
] // ini versi english plural buat routes

export const ROLES = [
  "Customer",
  "Manajer",
  "Administrator",
  "Supervisor",
  "Teknisi",
];

export const NAVCARDS: NavigationCardProps[][] = [
  [
    { name: "Beranda", path: "/" },
    { name: "Lihat Laporan Treatment ECO-101", path: "/reports" },
    { name: "Lihat Jadwal Treatment", path: "/" },
    { name: "Berikan Umpan Balik", path: "/" },
  ], // customer
  [
    { name: "Beranda", path: "/" },
    { name: "Kelola Akun Karyawan", path: "/employees" },
    { name: "Kelola Akun Customer", path: "/customers" },
    { name: "Buat Laporan Treatment ECO-101", path: "/" },
    { name: "Lihat Laporan Treatment ECO-101", path: "/reports" },
    { name: "Lihat Jadwal Treatment", path: "/schedules" },
    { name: "Alokasi Ulang Jadwal Treatment", path: "/" },
    { name: "Kelola Supervisor Outlet", path: "/" },
    { name: "Kelola Stok Chemical", path: "/" },
    { name: "Lihat Umpan Balik", path: "/" },
  ], // manager
  [
    { name: "Beranda", path: "/" },
    { name: "Kelola Akun Customer", path: "/customers" },
    { name: "Lihat Laporan Treatment ECO-101", path: "/reports" },
    { name: "Lihat Jadwal Treatment", path: "/" },
    { name: "Kelola Stok Chemical", path: "/" },
    { name: "Lihat Umpan Balik", path: "/" },
  ], // administrator
  [
    { name: "Beranda", path: "/" },
    { name: "Kelola Penanggung Jawab Outlet", path: "/assignments" },
    { name: "Buat Laporan Treatment ECO-101", path: "/" },
    { name: "Lihat Laporan Treatment ECO-101", path: "/reports" },
    { name: "Lihat Jadwal Treatment", path: "/schedules" },
    { name: "Setujui Jadwal Treatment", path: "/schedules" },
    { name: "Alokasi Ulang Jadwal Treatment", path: "/" },
    { name: "Kelola Stok Chemical", path: "/" },
    { name: "Lihat Umpan Balik", path: "/" },
  ], // supervisor
  [
    { name: "Beranda", path: "/" },
    { name: "Buat Laporan Treatment ECO-101", path: "/" },
    { name: "Lihat Laporan Treatment ECO-101", path: "/reports" },
    { name: "Lihat Jadwal Treatment", path: "/" },
    { name: "Ajukan Jadwal Treatment", path: "/" },
    { name: "Alokasi Ulang Jadwal Treatment", path: "/" },
    { name: "Stok Chemical Saya", path: "/" },
    { name: "Lihat Umpan Balik", path: "/" },
  ], // teknisi
];
