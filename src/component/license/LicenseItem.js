import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardImage, ProductCard } from "../product/styled/Product";
import { useEffect, useState } from "react";
import LicenseDialog from "./LicenseDialog";
import { MainContainer } from "../common/MainComponent";
import { LicenseModalMode } from "../../constants/mode";
import {Button, Grid, Input, Modal, ModalClose, Sheet, Stack} from "@mui/joy";
import { ProductOptionModalTitle } from "../product/styled/Product";
import { ModalMode } from "../../constants/mode";
import Checkbox from '@mui/joy/Checkbox';
import Swal from "sweetalert2";
import { deleteLicense } from "../../axios/License";
import { Toast } from "../../utils/Toast";
import { modifyLicense } from "../../axios/License";

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

   
  const navigate = useNavigate();
  const [modifyOpen, setModifyOpen] = useState(false);
  const [modeOption, setModeOption] = useState(LicenseModalMode.MODIFY);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [licenseImageId, setLicenseImageId] = useState(id);
  const [modeModify, setModeModify] = useState("VIEW");


  const [dto, setDto] = useState({
    artistName: "",
    artName: "",
    startDate: "",
    endDate: "",
    stock: "",
  });


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


  const onCloseAction = () => {
    setOpen(false);
    
    console.log("licenseIamgeUrl"+licenseImageUrl);
    console.log(artistName);
}


const modifyLicenseClick = () => {
  setOpen(false);
  console.log(id);
}


const OptionModify = () =>{
  setModeModify("VIEW");
}


  return (
    <MainContainer>


     
    <LicenseDialog open={open} onClose = {closeDialog}  licenseImageId={licenseImageId}  getLicenses={getLicenses} OptionModify = {OptionModify}/>
     <ProductCard variant="outlined" sx={{ width: 320 }} onClick={cardClicked}>

       <CardImage src={licenseImageUrl} loading="lazy" />
       
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
