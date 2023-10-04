import { MainContainer } from "../../component/common/MainComponent";
import SideNav from "../../component/common/side-nav/SideNav";
import { Box, Container } from "@mui/material";
import {
  ProductAddButtonWrapper,
  ProductBox,
  ProductHeaderWrapper,
  ProductTitle,
} from "../../component/product/styled/Product";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useState } from "react";
import LicenceDialog from "./LicenceDialog";

const Licence = () => {
  const [open, setOpen] = useState(false);
  const [licences, setLicences] = useState([
    {
      artistName: "colde",
      workName: "미야오",
      stock: "100",
      licenceImageUrl: "?",
      startDate: "2023-10-04",
      endDate: "2023-11-04",
    },
    {
      artistName: "grboy",
      workName: "멍",
      stock: "100",
      licenceImageUrl: "?",
      startDate: "2023-10-04",
      endDate: "2023-11-04",
    },
  ]);
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

          <ProductBox
            useFlexGap
            flexWrap={"wrap"}
            direction={"row"}
            spacing={2}
          >
            {licences?.map((licence) => {
              console.log(licence);
              return (
                <>
                  {licence.artistName}
                  {licence.workName}
                  {licence.stock}
                  {licence.licenceImageUrl}
                  {licence.startDate}
                  {licence.endDate}
                </>
              );
            })}
          </ProductBox>
          {open && <LicenceDialog open={open} onClose={closeDialog} />}
        </Container>
      </Box>
    </MainContainer>
  );
};

export default Licence;
