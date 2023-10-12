// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Stack,
// } from "@mui/material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { useState } from "react";
// import dayjs from "dayjs";
// import { createLicense, modifyLicense } from "../../axios/License";
// import Swal from "sweetalert2";
// import { LicenseModalMode } from "../../constants/mode";
// import { useEffect } from "react";
// import { modifyDetailLicense } from "../../axios/License";
// import { Editor } from "@toast-ui/editor";
// import TextArea from "antd/es/input/TextArea";
// import { Toast } from "../../utils/Toast";
// import { deleteLicense } from "../../axios/License";
// import LicenseImageInput from "./LicenseImageInput";
// import useAppContext from "../../utils/useAppContext";
// import { useNavigate } from "react-router-dom";


// const LicenseDialog = ({ open, onClose, getLicenses, mode,licenseImageId, optionModify}) => {
//   const [data, setData] = useState({
//     artistName: "",
//     artName: "",
//     stock: "",
//     tartDate: "",
//     endDate: "",
//   });
//   const [dto, setDto] = useState({
//     artistName: "",
//     artName: "",
//     startDate: "",
//     endDate: "",
//     stock: "",
//   });
//   const [date, setDate] = useState({
//     startDate: "",
//     endDate: "",
//   })
//   const navigate = useNavigate();
//   const [textAreaValue, setTextAreaValue] = useState("");
//   const { frameOption, setFrameOption } = useAppContext();
//   const [Modifyopen, setModifyOpen] = useState(false);
  
//   const [image, setImage] = useState();
//   const [modeModify, setModeModify] = useState("VIEW");
//   const onHandleChange = (e) => {
//     {mode === LicenseModalMode.ENROLL? setData({ ...data, [e.target.name]: e.target.value }) :  setDto({ ...dto, [e.target.name]: e.target.value })};  
//   };

//   useEffect(()=>{
//     if(licenseImageId === undefined) return;
//     retrieveLicenseDetailDataAndSetState();
//   }, [licenseImageId]);

//   const retrieveLicenseDetail = (prevData, licenseImageId) => {
//     modifyDetailLicense(licenseImageId).then((res) => {
//       prevData = res.data;
//       setDto(prevData);
//     });
    
//   }
//   function retrieveLicenseDetailDataAndSetState() {
//     let prevData;
//     try {
//       retrieveLicenseDetail(prevData, licenseImageId);
//     }catch (err){
//       console.error(err);
//     }
//     setData(prevData);
//   }
//   const onHandleChangeImage = (e) => {
//     setImage(e.target.files[0]);
//   };
//   const handleClose = () => {
//     onClose();
//   };
//   const ButtonClicked = () => {
//     if(mode===LicenseModalMode.ENROLL){
//       enrollLicense();
//     }else{

//       // setModifyOpen("EDIT");
//       editLicense();
//     //   if(modeModify === "EDIT"){
//     //   modifyLicense(dto, licenseImageId,image )
//     //   .then(() => {
//     //     console.log("editLicense"+image);
//     //     console.log("EDIT:");

//     //     Swal.fire({
//     //       title: "라이센스 수정에 성공했습니다!",
//     //       text: `행사 기간은: ${dto.startDate} ~ ${dto.endDate}까지 입니다`,
//     //       icon: "success",
//     //     }).then(() => getLicenses());
//     //   })
//     //   .catch(() => {
//     //     console.log(licenseImageId);
//     //     console.log("image"+image);
//     //     console.log(dto);
//     //     console.log("EDIT:");

//     //     Swal.fire({
//     //       title: "라이센스 수정에 실패했습니다",
//     //       icon: "error",
//     //     });
//     //   });
//     // }setModeModify("EDIT")
//     } 
//   };
//   const [ButtonText, setButtonText] = useState();
//   useEffect(() => {
//   setButtonText(mode === LicenseModalMode.ENROLL ? "등록하기" : "수정하기");
//   }, [open])
//   const enrollLicense = () => {
//     createLicense(data, image)
//       .then(() => {
//         console.log("enrollImages"+image);

//         Swal.fire({
//           title: "라이센스 등록에 성공했습니다!",
//           text: `행사 기간은: ${data.startDate} ~ ${data.endDate}까지 입니다`,
//           icon: "success",
//         }).then(() => getLicenses());
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
//     modifyLicense(data, licenseImageId,image )
//       .then(() => {
//         Swal.fire({
//           title: "라이센스 수정에 성공했습니다!",
//           text: `행사 기간은: ${dto.startDate} ~ ${dto.endDate}까지 입니다`,
//           icon: "success",
//         }).then(() => getLicenses());
//       })
//       .catch(() => {
//         console.log("ld"+licenseImageId);
//         console.log("imgage"+image);
//         console.log("dto"+dto.artistName);
//         Swal.fire({
//           title: "라이센스 수정에 실패했습니다",
//           text: `행사 기간은: ${dto.startDate} ~ ${dto.endDate}까지 입니다`,
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
//   const endDateChange = (date) => {
//     const formattedDate = dayjs(date).format(datePickerFormat);
//     setData((data) => ({
//       ...data,
//       endDate: formattedDate,
//     }));
//   };
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
//   const DeleteLicense = () => {
//     handleClose();
//       Swal.fire({
//       title: "정말로 라이선스를 삭제하시겠습니까?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "삭제하기",
//       cancelButtonText: "취소하기",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         const data = {
//           license: !licenseImageId,
//         };
        
//             deleteLicense(licenseImageId, data).then(() => {
//               getLicenses()
//               console.log(licenseImageId);
//           Toast.fire({
//             icon: "success",
//             title: "삭제가 완료되었습니다",
//           });
//         });
//       }
//     });
//   }

//   const [fileImage, setFileImage] = useState("");

//   // 파일 저장
//   const saveFileImage = (e) => {
//     setFileImage(URL.createObjectURL(e.target.files[0]));
//   };

//   // 파일 삭제
//   const deleteFileImage = () => {
//     URL.revokeObjectURL(fileImage);
//     setFileImage("");
//   };
 
  


//   const dateOption = ()=> {
//     <>
//             <DatePicker
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
//     </>
//   }

//   const datePreview = () =>{
//     <>
//     <div>Start Date</div>
//           <TextArea
//             variant="outlined"
//             sx={{ padding: "10px 25px" }}
//             value={dto.startDate}
//             readOnly = {modeModify==="VIEW"}

//             // onChange={(e) => onHandleChange(e)}
//           />

//     <div>Start Date</div>
//           <TextArea
//             variant="outlined"
//             sx={{ padding: "10px 25px" }}
//             value={dto.endDate}
//             readOnly = {modeModify==="VIEW"}

//             // onChange={(e) => onHandleChange(e)}
//           />
//     </>
//   }


//   return (
//     <>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>
//         {mode === LicenseModalMode.ENROLL? "작가 포토폴리오 등록" : "작가 포트폴리오 수정"}
//         </DialogTitle>
//         <DialogContent>
//           <>
//         {mode === LicenseModalMode.ENROLL? 
//           <>
//           <TextField
//            autoFocus
//            margin="dense"
//            name="artistName"
//            label="작품 이름"
//            fullWidth
//            variant="outlined"
                  
//           onChange={(e) => onHandleChange(e)}
//           />
//           <TextField
//           autoFocus
//           margin="dense"
//           name="artName"
//           label="작품 이름"
//           fullWidth
//           variant="outlined"
          
//           onChange={(e) => onHandleChange(e)}
//           />
//           <TextField
//           sautoFocus
//           margin="dense"
//           name="stock"
//           label="수량"
//           fullWidth
//           variant="outlined"
//           onChange={(e) => onHandleChange(e)}
//           />
//           </>       
//            : 
//            <>
//            <TextField
//             autoFocus
//             margin="dense"
//             name="artistName"
//             label="작품 이름"
//             fullWidth
//             variant="outlined"
                
//            value={dto.artistName}
//            onChange={(e) => onHandleChange(e)}

//            />
//            <TextField
//            autoFocus
//            margin="dense"
//            name="artName"
//            label="작품 이름"
//            fullWidth
//            variant="outlined"
         
//            value={dto.artName}
//            onChange={(e) => onHandleChange(e)}
//            />
//            <TextField
//            sautoFocus
//            margin="dense"
//            name="stock"
//            label="수량"
//            fullWidth
//            variant="outlined"
          
//            value={dto.stock}
//            onChange={(e) => onHandleChange(e)}
//            />
//            </>
//         }  
//           </>
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
//                 }}
                
//               />
//                {dto.startDate}
//               <DatePicker
//                 name="endDate"
//                 label="End"
//                 format="YYYY-MM-DD"
//                 onChange={(newValue) => {
//                   endDateOption(newValue);
//                 }}
//               />
//               {dto.endDate}

//             </DemoContainer>
//           </LocalizationProvider>
//           {mode === LicenseModalMode.ENROLL?
//             <>
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
//           </>
//           :
//         <>
//         {/* <LicenseImageInput width="60px" height="60px" />
//                   <div className="license-editor">
//                     <div
//                       onClick={(e) => {
//                         e.preventDefault();
//                         Object.values(frameOption).map((image) => {
//                           image !== ""
//                             ? navigate("/license")
//                             : alert("모든 옵션을 선택해주세요.");
//                         });
//                       }}
//                     >
//                       개성을 추가하러 가기
//                     </div>
//                   </div> */}

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
//         </>
//           }
//         </DialogContent>
//         <DialogActions>
//           <>
//         {mode === LicenseModalMode.ENROLL? 
//         <>
//         <Button onClick={() => enrollLicense()}>
//           {ButtonText}
//           </Button>
//            </>
//            :
//            <>
//            <Button onClick={() => editLicense()}>
//            {ButtonText}
//            </Button>
//            <Button color={"error"} onClick={DeleteLicense}>
//             삭제하기
//             </Button>
//             </>
//           }
//           </>
//           <Button onClick={handleClose}> 취소</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default LicenseDialog;







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
import { createLicense } from "../../axios/License";
import Swal from "sweetalert2";
import { LicenseModalMode } from "../../constants/mode";
import { modifyLicense } from "../../axios/License";
import { useEffect } from "react";
import { modifyDetailLicense } from "../../axios/License";
import { LICENSE_LIST } from "../../constants/api";
import { deleteLicense } from "../../axios/License";
import { Toast } from "../../utils/Toast";
import { Editor } from "@toast-ui/editor";
import { arTN } from "date-fns/locale";


const LicenseDialog = ({ open, onClose, getLicenses, mode,licenseImageId, OptionModify }) => {
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
  const [artistNameValue, setArtistNameValue] = useState("");
  const [artName, setArtName] = useState("");
  const [stock, setStock] = useState("");
  const [modifyMode, setModifyMode] = useState("VIEW");



  // const onHandleChange = (e) => {
  //   {mode === LicenseModalMode.ENROLL? setData({ ...data, [e.target.name]: e.target.value }) :  setDto({ ...dto, [e.target.name]: e.target.value })};  
  // };

  // useEffect(()=>{
  //   retrieveLicenseDetailDataAndSetState();
  // }, [licenseImageId]);

  // const retrieveLicenseDetail = (prevData, licenseImageId) => {
  //   modifyDetailLicense(licenseImageId).then((res) => {
  //     prevData = res.data;
  //     setDto(prevData);
  //     setArtistNameValue(prevData.artistName);
  //     setArtName(prevData.artName);
  //     setModifyMode("VIEW");
  //     console.log("retrieve"+modifyMode);


  //     setStock(prevData.stock);
  //     const viewer = new Editor.factory({
  //       el: document.querySelector("#viewer"),
  //       height: "500px",
  //       initialEditType: "wysiwyg",
  //       initialValue: prevData.content,
  //       language: "ko-KR",
  //       viewer: true,
  //     });
  //   });
    
  // }
  // function retrieveLicenseDetailDataAndSetState() {
  //   let prevData;
  //   try {
  //     console.log("retrieveLicenseDetailDataAndSetState");
  //     retrieveLicenseDetail(prevData, licenseImageId);
  //   }catch (err){
  //     console.error(err);
  //   }
  //   setDto(prevData);
  //   setData(prevData);
  // }

  const onHandleChange = (e) => {
    {mode === LicenseModalMode.ENROLL? setData({ ...data, [e.target.name]: e.target.value }) :  setDto({ ...dto, [e.target.name]: e.target.value })};  
  };
  const onHandleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleClose = () => {
    onClose();
  };
  const enrollLicense = () => {
    console.log(data.artName);
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
    console.log("editlicense"+modifyMode);
    if(modifyMode ==="EDIT"){
      
    modifyLicense(dto, licenseImageId,image )
      .then(() => {
        // retrieveLicenseDetailDataAndSetState();
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
    }
    // else console.log("else EDIT");
    setModifyMode("EDIT");
    console.log("set이후"+modifyMode);
    // onClose();
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
  const startDateChange = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setData((data) => ({
      ...data,
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
  const textChange = (e) => {
    setArtistNameValue(e.target.value);
    setDto({ ...dto, [e.target.name]: e.target.value });  
    setData({ ...data, [e.target.name]: e.target.value })

  }
  const textChange2 = (e) => {
    setArtName(e.target.value);
    setDto({ ...dto, [e.target.name]: e.target.value });  
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const textChange3 = (e) => {
    setStock(e.target.value);
    setDto({ ...dto, [e.target.name]: e.target.value });  
    setData({ ...data, [e.target.name]: e.target.value })
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
          sautoFocus
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
                
           value={dto.artistName}
           onChange={(e) => onHandleChange(e)}

           />
           <TextField
           autoFocus
           margin="dense"
           name="artName"
           label="작품 이름"
           fullWidth
           variant="outlined"
         
           value={dto.artName}
           onChange={(e) => onHandleChange(e)}
           />
           <TextField
           sautoFocus
           margin="dense"
           name="stock"
           label="수량"
           fullWidth
           variant="outlined"
          
           value={dto.stock}
           onChange={(e) => onHandleChange(e)}
           />
           </>
        }  
          </>
         
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
                }}
              />
              <DatePicker
                name="endDate"
                label="End"
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  endDateOption(newValue);
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
          {/* <Button onClick={handleClose}>취소</Button>
          <Button onClick={() => editLicense()}>등록</Button> */}
          {mode === LicenseModalMode.ENROLL ? (
                <>
                  <Button onClick={enrollLicense}>등록하기</Button>
                  <Button onClick={handleClose}> 취소</Button>

                </>
              ) : (
                <>
                  <Button onClick={editLicense}>
                    
                    {modifyMode === "VIEW" ? "수정모드" : "수정하기"}
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



