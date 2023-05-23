import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import LockClosedIcon from "@heroicons/react/24/solid/LockClosedIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";
import { SvgIcon } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { PATH_PRODUCT } from "../../../../constants/path";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Customers",
    path: "/customers",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Review",
    path: "/review",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Order",
    path: "/order",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Question",
    path: "/question",
    icon: (
      <SvgIcon fontSize="small">
        <LockClosedIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Notice",
    path: "/notice",
    icon: (
      <SvgIcon fontSize="small">
        <ArchiveBoxIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Product",
    path: PATH_PRODUCT,
    icon: (
      <SvgIcon fontSize={"small"}>
        <InventoryIcon />
      </SvgIcon>
    ),
  },
];
