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
import React, { useState } from "react";
import dayjs from "dayjs";
import { createLicense } from "../../axios/License";
import Swal from "sweetalert2";
import { LicenseModalMode } from "../../constants/mode";
import { modifyLicense } from "../../axios/License";
import { useEffect } from "react";
import { modifyDetailLicense } from "../../axios/License";
import { deleteLicense } from "../../axios/License";
import { Toast } from "../../utils/Toast";
import { arTN } from "date-fns/locale";
import Avatar from "antd/es/avatar/avatar";
import LicenseImageInput from "./LicenseImageInput";
import { useRef } from "react";
import { Error } from "@mui/icons-material";

const LicenseDialog = ({ open, onClose, getLicenses, mode,licenseImageId, imageUrl,imageUpdate }) => {
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
  const [imageFile, setImageFile] = useState(imageUrl);
  const [artistNameValue, setArtistNameValue] = useState("");
  const [artName, setArtName] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState("YYYY-MM-DD");
  const [endDate, setEndDate] = useState("YYYY-MM-DD");
  const fileInput = useRef(null);
  const [updateImage, setUpdateImage] = useState("");

  useEffect(()=>{
    retrieveLicenseDetailDataAndSetState();
  }, []);
  

  const retrieveLicenseDetail = (prevData, licenseImageId) => {
      modifyDetailLicense(licenseImageId).then((res) => {
        prevData = res.data;
        setArtistNameValue(prevData.artistName);
        setArtName(prevData.artName);
        setStock(prevData.stock);
        setStartDate(prevData.startDate);
        setEndDate(prevData.endDate);
      });
  }

  function retrieveLicenseDetailDataAndSetState() {
    let prevData;
    try {
      console.log("retrieveLicenseDetailDataAndSetState");
      retrieveLicenseDetail(prevData, licenseImageId);
    }catch (err){
      console.error(err);
    }
    setDto(prevData);
  }

  const ImageChange = (e) => {

    console.log("imagechange전:"+imageFile);
    const reader = new FileReader();
    console.log("setImageFile:"+imageFile);
    reader.onload = () => {
      if(reader.readyState === 2){
        setImageFile(reader.result);
        setUpdateImage({[e.target.name]: e.target.value});
      }
    }
    if(imageFile){
    reader.readAsDataURL(e.target.files[0]);
    }

  }

  const onHandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };
  const onHandleChangeImage = (e) => {
    {mode === LicenseModalMode.ENROLL?  setImage(e.target.files[0]): setImageFile(e.target.files[0])};

  };
  const handleClose = () => {
    onClose();
  };
  const enrollLicense = () => {
    console.log(data.startDate);
    createLicense(data, image)
      .then(() => {
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
    modifyLicense(dto, licenseImageId, imageFile )
      .then(() => {
        retrieveLicenseDetailDataAndSetState();
        Swal.fire({
          title: "라이센스 수정에 성공했습니다!",
          text: `행사 기간은: ${dto.startDate} ~ ${dto.endDate}까지 입니다`,
          icon: "success",
        }).then(() => getLicenses());
      })
      .catch(() => {
        Swal.fire({
          title: "라이센스 수정에 실패했습니다",
          icon: "error",
        })
      });
    onClose();
  }
  const DeleteLicense = () => {
        handleClose();
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
              license: !licenseImageId,
            };  
                deleteLicense(licenseImageId, data).then(() => {
                  getLicenses()
                  console.log(licenseImageId);
              Toast.fire({
                icon: "success",
                title: "삭제가 완료되었습니다",
              });
            });
          }
        });
      }
  const datePickerFormat = "YYYY-MM-DD";
  const datePickerUtils = {
    format: datePickerFormat,
    parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
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
 
  const textChangeArtistName = (e) => {
    setArtistNameValue(e.target.value);
    setDto({ ...dto, [e.target.name]: e.target.value });  

  }
  const textChangeArtName = (e) => {
    setArtName(e.target.value);
    setDto({ ...dto, [e.target.name]: e.target.value });  
  }
  const textChangeStock = (e) => {
    setStock(e.target.value);
    setDto({ ...dto, [e.target.name]: e.target.value });  
  }
  const check = () =>{
    console.log("check"+imageFile);
  }


  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {mode === LicenseModalMode.ENROLL? "작가 포토폴리오 등록" : "작가 포트폴리오 수정"}
         </DialogTitle>
         <DialogContent>
         <>
        {mode === LicenseModalMode.ENROLL? 
          <>
          <TextField
           autoFocus
           margin="dense"
           name="artistName"
           label="작품 이름"
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
          </>       
           : 
           <>
           <TextField
            autoFocus
            margin="dense"
            name="artistName"
            label="작품 이름"
            fullWidth
            variant="outlined"
            value={artistNameValue}
            onChange = {textChangeArtistName}
           />
           <TextField
           autoFocus
           margin="dense"
           name="artName"
           label="작품 이름"
           fullWidth
           variant="outlined"           
           value= {artName}     
           onChange = {textChangeArtName}
           />
           <TextField
           autoFocus
           margin="dense"
           name="stock"
           label="수량"
           fullWidth
           variant="outlined"
           value={stock}
           onChange = {textChangeStock}
           />
           </>
        }  
          </>
         
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateFormats={datePickerUtils}
          >
            <DemoContainer components={["DatePicker"]}>
            {mode === LicenseModalMode.ENROLL? 
              <>
              <DatePicker
                name="startDate"
                label="Start"
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  startDateOption(newValue);
                }}>
              </DatePicker>              
                <DatePicker
                name="endDate"
                label="End"
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  endDateOption(newValue);
                }}
              />
              </>
              :
            <>
              <DatePicker
                name="startDate"
                label="Start"
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  startDateOption(newValue);
                }}
                value={dayjs(startDate)}
              />
              <DatePicker
                name="endDate"
                label="End"
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  endDateOption(newValue);
                }}
                value={dayjs(endDate)}

              />
              </>
          }
            </DemoContainer>
          
          </LocalizationProvider>
          {mode === LicenseModalMode.ENROLL ? (
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
            ): (        
              <>
            <input 
              type='file' 
              style={{display:'none'}}
              accept='image/*' 
              name='updateImage'
              onChange={ImageChange}
              ref={fileInput}
              />

            <Avatar
              src={imageFile}
              style={{margin:'20px'}} 
              size={200} 
              onClick={()=>{fileInput.current.click()}}
              
            />  
            </>

            )
            }
        </DialogContent>
        <DialogActions>
          {mode === LicenseModalMode.ENROLL ? (
                <>
                  <Button onClick={enrollLicense}>등록하기</Button>
                  <Button onClick={handleClose}> 취소</Button>
                </>
              ) : (
                <>
                  <Button onClick={editLicense}>
                    수정하기
                  </Button>
                  <Button color={"error"} onClick={DeleteLicense}>
                    삭제하기
                  </Button>
                  <Button onClick={handleClose}> 취소</Button>

                </>
              )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LicenseDialog



