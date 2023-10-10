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
  
  

  // clearEditProps,
  // mode
}) => {

   
  const navigate = useNavigate();
  const [modifyOpen, setModifyOpen] = useState(false);
  const [modeOption, setModeOption] = useState(LicenseModalMode.ENROLL);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [licenseImageId, setLicenseImageId] = useState(id);

  const [dto, setDto] = useState({
    artistName: "",
    artName: "",
    startDate: "",
    endDate: "",
    stock: "",
  });

  useEffect(() => {
    setValue()
  })

  const cardClicked = () => {
    setOpen(true);
    setModeOption(LicenseModalMode.ENROLL);
  }

  const actived = () =>{

  }
  const closeDialog = () => {
    setModifyOpen(false);
    modifyLicenseClick();
  }

  const modeClick = () => {
    setModifyOpen(true);
  }
  const [value,setValue] = useState("");
  const [require,setRequire] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [buttonText, setButtonText] = useState();
  const [imageId, setImageId] = useState();

  const onCloseAction = () => {
    setOpen(false);
    // clearEditProps();
    setValue("");
    setRequire(false);
    setOnSale(false);
    actived();
}
const onActionButtonClicked = () => {
  // if(mode === LicenseModalMode.ENROLL){
  //     addOptionButtonClicked();
  // }else{
  //     editOptionDetail();
  // }
}

const modifyLicenseClick = () => {
  setOpen(false);
  console.log(id);
  // const data = {
  //   license: !id,
  // };
  //   modifyLicense(licenseImageId, licenseImageUrl, id)
  //   .then(() => {
  //     Swal.fire({
  //       title: "라이센스 수정에 성공했습니다!",
  //       text: `행사 기간은: ${data.startDate} ~ ${data.endDate}까지 입니다`,
  //       icon: "success",
  //     });
  //   })
  //   .catch(() => {
  //     Swal.fire({
  //       title: "라이센스 수정에 실패했습니다",
  //       icon: "error",
  //     });
  //   });


}

const DeleteLicense = () => {
  setOpen(false);

    Swal.fire({
    title: "정말로 라이선스를 삭제하시겠습니까?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "삭제하기",
    cancelButtonText: "취소하기",
  }).then((result) => {
    if (result.isConfirmed) {
      const data = {
        license: !id,
      };
      
          deleteLicense(id, data).then(() => {
            console.log();
        Toast.fire({
          icon: "success",
          title: "삭제가 완료되었습니다",
        });
        actived();
      });
    }
  });

}


  return (
    <MainContainer>

      <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            hideBackdrop={true}
            onClose={() => onCloseAction()}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Sheet
                variant="outlined"
                sx={{
                    minWidth : 500,
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                    }}
                />
            
                <Grid container spacing={2} sx={{ flexGrow: 1 }} alignItems={"center"}>
                </Grid>
                <Stack direction={"row"} justifyContent={"center"} spacing={1} marginTop={2}>
                    <Button onClick={modeClick}>수정하기</Button>
                    <Button onClick={DeleteLicense} color={"warning"}>삭제</Button>
                    <Button onClick={onCloseAction} color={"danger"}>취소하기</Button>
                </Stack>
            </Sheet>
        </Modal>
        { open &&<LicenseDialog open={modifyOpen} onClose = {closeDialog}  licenseImageId={licenseImageId} setLicenseImageId = {setLicenseImageId}/>}


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
