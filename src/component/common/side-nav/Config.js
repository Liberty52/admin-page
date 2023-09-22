import {
  ChartBarIcon,
  StarIcon,
  UsersIcon,
  ClipboardIcon,
  QuestionMarkCircleIcon,
  GiftIcon,
  ComputerDesktopIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { SvgIcon } from "@mui/material";
import { PATH_PRODUCT } from "../../../constants/path";

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
        <StarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Order",
    path: "/order",
    icon: (
      <SvgIcon fontSize="small">
        <GiftIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Question",
    path: "/question",
    icon: (
      <SvgIcon fontSize="small">
        <QuestionMarkCircleIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Notice",
    path: "/notice",
    icon: (
      <SvgIcon fontSize="small">
        <ClipboardIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Product",
    path: PATH_PRODUCT,
    icon: (
      <SvgIcon fontSize={"small"}>
        <ComputerDesktopIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Logout",
    onClick: () => {
      onLogoutClicked();
    },
    icon: (
      <SvgIcon fontSize={"small"}>
        <ArrowLeftOnRectangleIcon />
      </SvgIcon>
    ),
  },
];

function onLogoutClicked() {
  if (window.confirm("로그아웃 하시겠습니까?")) {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  }
}
