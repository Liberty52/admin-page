import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardImage, ProductCard } from "../product/styled/Product";
import { useState } from "react";
import LicenseDialog from "./LicenseDialog";
import { MainContainer } from "../common/MainComponent";
import { LicenseModalMode } from "../../constants/mode";
import { SelfImprovementSharp } from "@mui/icons-material";

const LicenseItem = ({
  id,
  artistName,
  artName,
  stock,
  licenseImageUrl,
  startDate,
  endDate,
  getLicenses,
  
}) => {   
  const [modifyOpen, setModifyOpen] = useState(false);
  const [modeOption, setModeOption] = useState(LicenseModalMode.MODIFY);
  const [open, setOpen] = useState(false);
  const [licenseImageId, setLicenseImageId] = useState(id);
  const [modeModify, setModeModify] = useState("VIEW");
  const [imageUrl, setImageUrl] = useState(licenseImageUrl);
  const [imageChange, setImageChange] = useState(imageUrl);

  const cardClicked = () => {
    setOpen(true); 
    setModeOption(LicenseModalMode.MODIFY);
  }
  const closeDialog = () => {
    setModifyOpen(false);
    modifyLicenseClick();
  }

  const modeClick = () => {
    setModifyOpen(true);
  }

  const handleImageChange = () => {
    setImageUrl(imageUrl);
  }

  const onCloseAction = () => {
    setOpen(false);
    
  }

  const updateImage = () => {
  console.log("가져온이미지"+imageUrl);
  setImageChange(imageUrl);
  setImageUrl(imageUrl);
  }


  const modifyLicenseClick = () => {
  setOpen(false);
  }


  const OptionModify = () =>{
  setModeModify("VIEW");
  }

  return (
    <MainContainer>
  
    <LicenseDialog open={open} onClose = {closeDialog}  licenseImageId={licenseImageId} setLicenseImageId={setLicenseImageId} getLicenses={getLicenses} mode = {modeOption} OptionModify = {OptionModify}  imageUrl = {licenseImageUrl} imageUpdate = {updateImage}  >
    </LicenseDialog>
    <div onChange = {updateImage}></div>
     <ProductCard variant="outlined" sx={{ width: 320 }} onClick={cardClicked}>

       <CardImage  src={licenseImageUrl} loading="lazy" />
       
       <Box sx={{ display: "flex" }}>
         <div key={id}>
           <Typography variant="h5">작가: {artistName}</Typography>
           <Typography variant="h5">작품명: {artName}</Typography>
           <Typography variant="h5">개수: {stock}</Typography>
           <Typography variant="h5">
             {startDate} ~ {endDate}
           </Typography>
           
         </div>
       </Box>
     </ProductCard>
     
     </MainContainer>
  );
};


export default LicenseItem;
