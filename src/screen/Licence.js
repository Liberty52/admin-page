import { MainContainer } from "../component/common/MainComponent";
import SideNav from "../component/common/side-nav/SideNav";
import { Box, Container } from "@mui/material";
import {
  ProductAddButtonWrapper,
  ProductBox,
  ProductHeaderWrapper,
  ProductTitle,
} from "../component/product/styled/Product";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useState } from "react";
import LicenceDialog from "../component/licence/LicenceDialog";
import LicenceItem from "../component/licence/LicenceItem";
import MOCK_IMAGE1 from "../image/icon/frame.png";
import MOCK_IMAGE2 from "../image/icon/liberty52.jpg";

const Licence = () => {
  const [open, setOpen] = useState(false);
  const [licences, setLicences] = useState([
    {
      artistName: "colde",
      workName: "미야오",
      stock: "100",
      licenceImageUrl: MOCK_IMAGE1,
      startDate: "2023-10-04",
      endDate: "2023-11-04",
    },
    {
      artistName: "grboy",
      workName: "멍",
      stock: "100",
      licenceImageUrl: MOCK_IMAGE2,
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
              return (
                <LicenceItem
                  artistName={licence.artistName}
                  workName={licence.workName}
                  stock={licence.stock}
                  licenceImageUrl={licence.licenceImageUrl}
                  startDate={licence.startDate}
                  endDate={licence.endDate}
                />
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
