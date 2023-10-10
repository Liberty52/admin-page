// import { MainContainer } from "../component/common/MainComponent";
// import SideNav from "../component/common/side-nav/SideNav";
// import { Box, Container } from "@mui/material";
// import {
//   ProductAddButtonWrapper,
//   ProductBox,
//   ProductHeaderWrapper,
//   ProductTitle,
// } from "../component/product/styled/Product";
// import ControlPointIcon from "@mui/icons-material/ControlPoint";
// import { useEffect, useState } from "react";
// import LicenseDialog from "../component/license/LicenseDialog";
// import LicenseItem from "../component/license/LicenseItem";
// import { getLicenseList } from "../axios/License";
// import { LicenseModalMode } from "../constants/mode";
// import { ModalMode } from "../constants/mode";


// const License = () => {
//   const [open, setOpen] = useState(false);
//   const [licenses, setLicenses] = useState([]);
//   const [optionDetailMode, setOptionDetailMode] = useState(LicenseModalMode.ENROLL);
//   const [mode, setMode] = useState(LicenseModalMode.ENROLL);

//   useEffect(() => {
//     getLicenses();
//   }, []);
//   const getLicenses = () => {
//     getLicenseList().then((res) => {
//       setLicenses(res.data);
//     });
//   // }, [licenses]);
//   };
//   const openDialog = () => {
//     setOptionDetailMode(LicenseModalMode.ENROLL);
//     setOpen(true);
//   };
//   const closeDialog = () => {
//     setOpen(false);
//   };
//   const [optionModalOpen, setOptionModalOpen] = useState(false);

//   const EnrollButtonClicked = () =>{
//     setMode(LicenseModalMode.ENROLL);
//   }



  
//   return (
//     <MainContainer>
//       <SideNav />
//       <Box
//         component="main"
//         sx={{
//           padding: "0 5%",
//           flexGrow: 1,
//           py: 8,
//         }}
//       >
//         <Container sx={{ marginLeft: "30px" }} maxWidth="xl">
//           <ProductHeaderWrapper
//             direction={"row"}
//             justifyContent={"space-between"}
//             alignItems={"center"}
//           >
//             <ProductTitle>라이센스</ProductTitle>
//             <ProductAddButtonWrapper>
//               <ControlPointIcon
//                 onClick={() => {
//                   openDialog();
//                 }}
//               />
//             </ProductAddButtonWrapper>
//           </ProductHeaderWrapper>

//           <ProductBox
//             useFlexGap
//             flexWrap={"wrap"}
//             direction={"row"}
//             spacing={2}
//           >
//             {licenses?.id === undefined &&
//               licenses?.map((license) => {
//                 return (
//                   <LicenseItem 
//                     id={license.id}
//                     artistName={license.artistName}
//                     artName={license.artName}
//                     stock={license.stock}
//                     licenseImageUrl={license.licenseImageUrl}
//                     startDate={license.startDate}
//                     endDate={license.endDate}
//                   />
//                 );
//               })}
//           </ProductBox>
//           {open && <LicenseDialog open={open} onClose={closeDialog} getLicenses={getLicenses} EnrollButton = {EnrollButtonClicked} mode={LicenseModalMode.ENROLL}/>}
//         </Container>
//       </Box>
//     </MainContainer>
//   );
// };

// export default License;


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
import { useEffect, useState } from "react";
import LicenseDialog from "../component/license/LicenseDialog";
import LicenseItem from "../component/license/LicenseItem";
import { getLicenseList } from "../axios/License";
import { LicenseModalMode } from "../constants/mode";
import { ModalMode } from "../constants/mode";

const License = () => {
  const [open, setOpen] = useState(false);
  const [licenses, setLicenses] = useState([]);
  const [optionDetailMode, setOptionDetailMode] = useState(LicenseModalMode.ENROLL);
  const [mode, setMode] = useState(LicenseModalMode.ENROLL);

  useEffect(() => {
    
    getLicenseList().then((res) => {
      setLicenses(res.data);
    });
  }, [licenses]);
  const openDialog = () => {
    setOptionDetailMode(LicenseModalMode.ENROLL);
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  const [optionModalOpen, setOptionModalOpen] = useState(false);

  const EnrollButtonClicked = () =>{
    setMode(LicenseModalMode.ENROLL);
  }


  
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
            {licenses?.id === undefined &&
              licenses?.map((license) => {
                return (
                  <LicenseItem 
                    id={license.id}
                    artistName={license.artistName}
                    artName={license.artName}
                    stock={license.stock}
                    licenseImageUrl={license.licenseImageUrl}
                    startDate={license.startDate}
                    endDate={license.endDate}
                  />
                );
              })}
          </ProductBox>
          {open && <LicenseDialog open={open} onClose={closeDialog} EnrollButton = {EnrollButtonClicked} mode={LicenseModalMode.ENROLL}/>}
        </Container>
      </Box>
    </MainContainer>
  );
};

export default License;

