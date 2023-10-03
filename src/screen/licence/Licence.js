import { MainContainer } from "../../component/common/MainComponent";
import SideNav from "../../component/common/side-nav/SideNav";
import { Box, Container } from "@mui/material";
import {
  ProductAddButtonWrapper,
  ProductHeaderWrapper,
  ProductTitle,
} from "../../component/product/styled/Product";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useState } from "react";
import LicenceDialog from "./LicenceDialog";

const Licence = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <MainContainer>
      <SideNav />
      <Box
        component="main"
        sx={{
          padding: "0 5%",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container sx={{ marginLeft: "30px" }} maxWidth="xl">
          <ProductHeaderWrapper
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <ProductTitle>라이센스</ProductTitle>
            <ProductAddButtonWrapper>
              <ControlPointIcon
                onClick={() => {
                  openDialog();
                }}
              />
            </ProductAddButtonWrapper>
          </ProductHeaderWrapper>
          {open && <LicenceDialog open={open} onClose={closeDialog} />}
        </Container>
      </Box>
    </MainContainer>
  );
};

export default Licence;
