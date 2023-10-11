import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
import { createLicense, modifyLicense } from "../../axios/License";
import Swal from "sweetalert2";
import { LicenseModalMode } from "../../constants/mode";
import { useEffect } from "react";



const LicenseDialog = ({ open, onClose, getLicenses, mode,licenseImageId }) => {
  const [data, setData] = useState({
    artistName: "",
    artName: "",
    stock: "",
  });
  const [dto, setDto] = useState({
    artistName: "",
    artName: "",
    startDate: "",
    endDate: "",
    stock: "",
  });
  const [image, setImage] = useState();
  const [modifyImage, setModifyImage] = useState();
  const onHandleChange = (e) => {
    {mode === LicenseModalMode.ENROLL? setData({ ...data, [e.target.name]: e.target.value }) :  setDto({ ...dto, [e.target.name]: e.target.value })};  
  };
  const onHandleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleClose = () => {
    onClose();
  };
  const ButtonClicked = () => {
    if(mode===LicenseModalMode.ENROLL){
      enrollLicense();
    }else{
     
      setImage();
      editLicense();
    }
  };
  const [ButtonText, setButtonText] = useState();
  useEffect(() => {
  setButtonText(mode === LicenseModalMode.ENROLL ? "등록하기" : "수정하기");
  }, [open])
  const enrollLicense = () => {
    createLicense(data, image)
      .then(() => {
        console.log("enrollImages"+image);

        Swal.fire({
          title: "라이센스 등록에 성공했습니다!",
          text: `행사 기간은: ${data.startDate} ~ ${data.endDate}까지 입니다`,
          icon: "success",
        }).then(() => getLicenses());
      })
      .catch(() => {
        Swal.fire({
          title: "라이센스 등록에 실패했습니다",
          icon: "error",
        });
      });
    onClose();
  };
  const editLicense = () =>{
    modifyLicense(dto, licenseImageId,image )
      .then(() => {
        console.log("editLicense"+image);

        Swal.fire({
          title: "라이센스 수정에 성공했습니다!",
          text: `행사 기간은: ${dto.startDate} ~ ${dto.endDate}까지 입니다`,
          icon: "success",
        }).then(() => getLicenses());
      })
      .catch(() => {
        console.log(licenseImageId);
        console.log(image);
        console.log(dto);
        Swal.fire({
          title: "라이센스 수정에 실패했습니다",
          icon: "error",
        });
      });
    onClose();
  
  }
  const datePickerFormat = "YYYY-MM-DD";
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
  };
  const startDateChange = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setData((data) => ({
      ...data,
      startDate: formattedDate,
    }));
  };
  const startDateOption = (date) =>{
    const formattedDate = dayjs(date).format(datePickerFormat);
  
    {mode === LicenseModalMode.ENROLL?  setData((data) => ({
      ...data,
      startDate: formattedDate,
    })):  setDto((dto) => ({
      ...dto,
      startDate: formattedDate,
    })) };
  }
  const endDateChange = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setData((data) => ({
      ...data,
      endDate: formattedDate,
    }));
  };
  const endDateOption = (date) =>{
    const formattedDate = dayjs(date).format(datePickerFormat);
  
    {mode === LicenseModalMode.ENROLL?   setData((data) => ({
      ...data,
      endDate: formattedDate,
    })): setDto((dto) => ({
      ...dto,
      endDate: formattedDate,
    })) };
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
        {mode === LicenseModalMode.ENROLL? "작가 포토폴리오 등록" : "작가 포트폴리오 수정"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="artistName"
            label="작가 이름"
            fullWidth
            variant="outlined"
            onChange={(e) => onHandleChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            name="artName"
            label="작품 이름"
            fullWidth
            variant="outlined"
            onChange={(e) => onHandleChange(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            name="stock"
            label="수량"
            fullWidth
            variant="outlined"
            onChange={(e) => onHandleChange(e)}
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateFormats={datePickerUtils}
          >
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                name="startDate"
                label="Start"
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  startDateOption(newValue);
                  // startDateChange(newValue);
                  // startDateChangeModify(newValue);
                }}
              />
              <DatePicker
                name="endDate"
                label="End"
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  endDateOption(newValue);
                  // endDateChange(newValue);
                  // endDateChangeModify(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              accept="image/*"
              name="image"
              hidden
              onChange={(e) => onHandleChangeImage(e)}
            />
          </Button>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => ButtonClicked()}>{ButtonText}</Button>
          <Button onClick={handleClose}>취소</Button>
          {/* <Button onClick={() => enrollLicense()}>등록</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LicenseDialog;