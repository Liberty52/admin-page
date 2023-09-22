import { Stack } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { items } from "./Config";
import { SideNavItem } from "./SideNavItem";

const SideNav = () => {
  const pathname = useLocation().pathname;
  return (
    <>
      <Stack
        component="ul"
        spacing={1}
        sx={{
          minHeight: "calc(100vh - 96px)",
          listStyle: "none",
          backgroundColor: "rgb(28, 37, 54)",
          paddingY: 6,
          paddingX: 3,
          m: 0,
        }}
      >
        {items.map((item, index) => {
          let active = false;
          // Overview Tab - pathname이 '/'일 때만 active
          if (item.path === "/") {
            if (pathname === "/") active = true;
          }
          // 나머지 - pathname으로 시작할 때 active
          else if (pathname.startsWith(item.path)) active = true;

          return (
            <Link to={item.path} key={index}>
              <SideNavItem
                active={active}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
                onClick={item.onClick}
              />
            </Link>
          );
        })}
      </Stack>
    </>
  );
};

export default SideNav;
