import { Box, Typography } from "@mui/material";
import { CardImage, ProductCard } from "../product/styled/Product";
import { useState } from "react";
import LicenseDialog from "./LicenseDialog";
import { MainContainer } from "../common/MainComponent";
import { LicenseModalMode } from "../../constants/mode";

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

  const updateImage = () => {
  setImageChange(imageUrl);
  setImageUrl(imageUrl);
  }

  const modifyLicenseClick = () => {
  setOpen(false);
  }


  return (
    <MainContainer>
  
    <LicenseDialog open={open} onClose = {closeDialog}  licenseImageId={licenseImageId} setLicenseImageId={setLicenseImageId} getLicenses={getLicenses} mode = {modeOption}  imageUrl = {licenseImageUrl} imageUpdate = {updateImage}  >
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
