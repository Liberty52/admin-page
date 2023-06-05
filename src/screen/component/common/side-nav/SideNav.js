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
          listStyle: "none",
          backgroundColor: "rgb(28, 37, 54)",
          paddingY: 6,
          paddingX: 3,
          m: 0,
        }}
      >
        {items.map((item, index) => {
          const active = item.path ? pathname === item.path : false;

          return (
            <Link to={item.path} key={index}>
              <SideNavItem
                active={active}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            </Link>
          );
        })}
      </Stack>
    </>
  );
};

export default SideNav;
