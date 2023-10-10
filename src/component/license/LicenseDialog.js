// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { useState } from "react";
// import dayjs from "dayjs";
// import { createLicense, modifyLicense } from "../../axios/License";
// import Swal from "sweetalert2";
// import LicenseImageInput from "./LicenseImageInput";
// import { LicenseModalMode } from "../../constants/mode";
// import { useEffect } from "react";
// import { ModalMode } from "../../constants/mode";

// const LicenseDialog = ({ open, onClose, mode, getLicenses, licenseImageId, setLicenseImageId }) => {
//   const [data, setData] = useState({
//     artistName: "",
//     artName: "",
//     stock: "",
//   });
//   const [dto, setDto] = useState({
//     artistName: "",
//     artName: "",
//     startDate: "",
//     endDate: "",
//     stock: "",
//   });
//   const [image, setImage] = useState();
//   const [value, setValue] = useState();
 
//   const onHandleChange = (e) => {
//     {mode === LicenseModalMode.ENROLL? setData({ ...data, [e.target.name]: e.target.value }) :  setDto({ ...dto, [e.target.name]: e.target.value })};
//     // setData({ ...data, [e.target.name]: e.target.value });

//   };

//   const onDtoChange = (e) => {
//     setDto({ ...dto, [e.target.name]: e.target.value });

//   }
//   const onHandleChangeImage = (e) => {
//     setImage(e.target.files[0]);
//   };
//   const handleClose = () => {
//     onClose();
//   };
//   const [optionDetailMode, setOptionDetailMode] = useState(LicenseModalMode.ENROLL);


//   const [enroll, setEnroll] = useState();

//   const ButtonClicked = () => {
//     if(mode===LicenseModalMode.ENROLL){
//       enrollLicense();
//     }else{
//       editLicense();
//     }
//   };
//   const enrollLicense = () => {

//     createLicense(data, image)
//       .then(() => {
//         Swal.fire({
//           title: "라이센스 등록에 성공했습니다!",
//           text: `행사 기간은: ${data.startDate} ~ ${data.endDate}까지 입니다`,
//           icon: "success",
//         // })
//       }).then(() => getLicenses());
//       })
//       .catch(() => {  
//         Swal.fire({
//           title: "라이센스 등록에 실패했습니다",
//           icon: "error",
//         });
//       });
    
//     onClose();
//   };
//   const editLicense = () =>{
//     modifyLicense(dto, licenseImageId,image )
//       .then(() => {
//         Swal.fire({
//           title: "라이센스 수정에 성공했습니다!",
//           text: `행사 기간은: ${dto.startDate} ~ ${dto.endDate}까지 입니다`,
//           icon: "success",
//         });
//       })
//       .catch(() => {
//         console.log(licenseImageId);
//         console.log(image);
//         console.log(dto);
//         Swal.fire({
//           title: "라이센스 수정에 실패했습니다",
//           icon: "error",
//         });
//       });
//     onClose();

//   }
//   const datePickerFormat = "YYYY-MM-DD";
//   const datePickerUtils = {
//     format: datePickerFormat,
//     parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
//   };
  
//   const startDateChange = (date) => {
//     const formattedDate = dayjs(date).format(datePickerFormat);

//     setData((data) => ({
//       ...data,
//       startDate: formattedDate,
//     }));
//   };
//   const startDateChangeModify = (date) => {
//     const formattedDate = dayjs(date).format(datePickerFormat);
//     setDto((dto) => ({
//       ...dto,
//       startDate: formattedDate,
//     }));
//   };
//   const endDateChange = (date) => {
//     const formattedDate = dayjs(date).format(datePickerFormat);
//     setData((data) => ({
//       ...data,
//       endDate: formattedDate,
//     }));
//   };
//   const endDateChangeModify = (date) => {
//     const formattedDate = dayjs(date).format(datePickerFormat);
//     setDto((dto) => ({
//       ...dto,
//       endDate: formattedDate,
//     }));
//   };
//   const [imgFile, setImgFile] = useState(image);
//   const [modifyOpen, setModifyOpen] = useState(false);

//   const startDateOption = (date) =>{
//     const formattedDate = dayjs(date).format(datePickerFormat);

//     {mode === LicenseModalMode.ENROLL?  setData((data) => ({
//       ...data,
//       startDate: formattedDate,
//     })):  setDto((dto) => ({
//       ...dto,
//       startDate: formattedDate,
//     })) };
//   }

//   const endDateOption = (date) =>{
//     const formattedDate = dayjs(date).format(datePickerFormat);

//     {mode === LicenseModalMode.ENROLL?   setData((data) => ({
//       ...data,
//       endDate: formattedDate,
//     })): setDto((dto) => ({
//       ...dto,
//       endDate: formattedDate,
//     })) };
//   } 

//   const OpenDialog = () => {
//     setModifyOpen(true);
//   };

//   const [ButtonText, setButtonText] = useState();
//   useEffect(() => {
//     setButtonText(mode === LicenseModalMode.ENROLL ? "등록하기" : "수정하기");
//   }, [open])



//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} mode={enroll}>
//         <DialogTitle>
//           {mode === LicenseModalMode.ENROLL? "작가 포토폴리오 등록" : "작가 포트폴리오 수정"}
//         </DialogTitle>

//         <DialogContent>
//           {mode === LicenseModalMode.ENROLL? onHandleChange : onDtoChange}
//           <TextField
//             autoFocus
//             margin="dense"
//             name="artistName"
//             label="작가 이름"
//             fullWidth
//             variant="outlined"

//             // {mode === LicenseModalMode.ENROLL? onChange={(e) => onHandleChange(e)} : onChange={(e) => onDtoChange(e)} }
//             // onChange={(e) => onDtoChange(e)}
//             onChange={(e) => onHandleChange(e)}

//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             name="artName"
//             label="작품 이름"
//             fullWidth
//             variant="outlined"
//             // onChange={(e) => onDtoChange(e)}
//             onChange={(e) => onHandleChange(e)}

//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             name="stock"
//             label="수량"
//             fullWidth
//             variant="outlined"
//             // onChange={(e) => onDtoChange(e)}
//             onChange={(e) => onHandleChange(e)}

//           />
//           <LocalizationProvider
//             dateAdapter={AdapterDayjs}
//             dateFormats={datePickerUtils}
//           >
//             <DemoContainer components={["DatePicker"]}>
//               <DatePicker
//                 name="startDate"
//                 label="Start"
//                 format="YYYY-MM-DD"
//                 onChange={(newValue) => {
//                   startDateOption(newValue);
//                   // startDateChange(newValue);
//                   // startDateChangeModify(newValue);
//                 }}
//               />
//               <DatePicker
//                 name="endDate"
//                 label="End"
//                 format="YYYY-MM-DD"
//                 onChange={(newValue) => {
//                   endDateOption(newValue);
//                   // endDateChange(newValue);
//                   // endDateChangeModify(newValue);
//                 }}
//               />
//             </DemoContainer>
//           </LocalizationProvider>
//           <Button variant="contained" component="label">
//             Upload File
//             <input
//               type="file"
//               accept="image/*"
//               name="image"
//               hidden
//               onChange={(e) => onHandleChangeImage(e)}
//             />
//           </Button>
//           <LicenseImageInput imgFile = {imgFile} setImgFile={setImgFile}></LicenseImageInput>
//         </DialogContent>
//         <DialogActions>
//           {/* <Button onClick={() => enrollLicense()}>{ButtonText}</Button> */}
//           <Button onClick={() => ButtonClicked()}>{ButtonText}</Button>
//           <Button onClick={handleClose}>취소</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default LicenseDialog;
import{
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
import LicenseImageInput from "./LicenseImageInput";
import { LicenseModalMode } from "../../constants/mode";
import { useEffect } from "react";
import { ModalMode } from "../../constants/mode";

const LicenseDialog = ({ open, onClose, mode, licenseImageId, setLicenseImageId }) => {
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
const [value, setValue] = useState();

const onHandleChange = (e) => {
  {mode === LicenseModalMode.ENROLL? setData({ ...data, [e.target.name]: e.target.value }) :  setDto({ ...dto, [e.target.name]: e.target.value })};
  // setData({ ...data, [e.target.name]: e.target.value });

};

const onDtoChange = (e) => {
  setDto({ ...dto, [e.target.name]: e.target.value });

}
const onHandleChangeImage = (e) => {
  setImage(e.target.files[0]);
};
const handleClose = () => {
  onClose();
};
const [optionDetailMode, setOptionDetailMode] = useState(LicenseModalMode.ENROLL);

const [enroll, setEnroll] = useState();

const ButtonClicked = () => {
  if(mode===LicenseModalMode.ENROLL){
    enrollLicense();
  }else{
    editLicense();
  }
};
const enrollLicense = () => {

  createLicense(data, image)
    .then(() => {
      Swal.fire({
        title: "라이센스 등록에 성공했습니다!",
        text: `행사 기간은: ${data.startDate} ~ ${data.endDate}까지 입니다`,
        icon: "success",
      })
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
      Swal.fire({
        title: "라이센스 수정에 성공했습니다!",
        text: `행사 기간은: ${dto.startDate} ~ ${dto.endDate}까지 입니다`,
        icon: "success",
      });
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
const startDateChangeModify = (date) => {
  const formattedDate = dayjs(date).format(datePickerFormat);
  setDto((dto) => ({
    ...dto,
    startDate: formattedDate,
  }));
};
const endDateChange = (date) => {
  const formattedDate = dayjs(date).format(datePickerFormat);
  setData((data) => ({
    ...data,
    endDate: formattedDate,
  }));
};
const endDateChangeModify = (date) => {
  const formattedDate = dayjs(date).format(datePickerFormat);
  setDto((dto) => ({
    ...dto,
    endDate: formattedDate,
  }));
};
const [imgFile, setImgFile] = useState(image);
const [modifyOpen, setModifyOpen] = useState(false);

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

const OpenDialog = () => {
  setModifyOpen(true);
};

const [ButtonText, setButtonText] = useState();
useEffect(() => {
  setButtonText(mode === LicenseModalMode.ENROLL ? "등록하기" : "수정하기");
}, [open])


return (
  <>
    <Dialog open={open} onClose={handleClose} mode={enroll}>
      <DialogTitle>
        {mode === LicenseModalMode.ENROLL? "작가 포토폴리오 등록" : "작가 포트폴리오 수정"}
      </DialogTitle>

      <DialogContent>
        {mode === LicenseModalMode.ENROLL? onHandleChange : onDtoChange}
        <TextField
          autoFocus
          margin="dense"
          name="artistName"
          label="작가 이름"
          fullWidth
          variant="outlined"

          // {mode === LicenseModalMode.ENROLL? onChange={(e) => onHandleChange(e)} : onChange={(e) => onDtoChange(e)} }
          // onChange={(e) => onDtoChange(e)}
          onChange={(e) => onHandleChange(e)}

        />
        <TextField
          autoFocus
          margin="dense"
          name="artName"
          label="작품 이름"
          fullWidth
          variant="outlined"
          // onChange={(e) => onDtoChange(e)}
          onChange={(e) => onHandleChange(e)}

        />
        <TextField
          autoFocus
          margin="dense"
          name="stock"
          label="수량"
          fullWidth
          variant="outlined"
          // onChange={(e) => onDtoChange(e)}
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
        <LicenseImageInput imgFile = {imgFile} setImgFile={setImgFile}></LicenseImageInput>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => enrollLicense()}>{ButtonText}</Button> */}
        <Button onClick={() => ButtonClicked()}>{ButtonText}</Button>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  </>
);
};

export default LicenseDialog;

