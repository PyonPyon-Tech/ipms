import { NavigationCardProps } from "@type/navigationCardProps";

export const ROLES = [
  "Customer",
  "Manajer",
  "Administrator",
  "Supervisor",
  "Teknisi",
];

export const NAVCARDS: NavigationCardProps[][] = [
  [
    { icon: "home", name: "Home", path: "/" },
    { icon: "store", name: "Kelola Customer", path: "/customers" },
  ], // customer
  [
    { icon: "home", name: "Home", path: "/" },
    { icon: "store", name: "Kelola Customer", path: "/customers" },
  ], // manager
  [
    { icon: "home", name: "Home", path: "/" },
    { icon: "store", name: "Kelola Customer", path: "/customers" },
  ], // administrator
  [
    { icon: "home", name: "Home", path: "/" },
    { icon: "store", name: "Kelola Customer", path: "/customers" },
  ], // supervisor
  [
    { icon: "home", name: "Home", path: "/" },
    { icon: "store", name: "Kelola Customer", path: "/customers" },
  ], // teknisi
];
