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

const LicenseDialog = ({ open, onClose }) => {
  const [data, setData] = useState({
    artistName: "",
    artName: "",
    stock: "",
  });
  const [image, setImage] = useState();
  const onHandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onHandleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleClose = () => {
    onClose();
  };
  const enrollLicense = () => {
    createLicense(data, image)
      .then(() => {
        console.log("완");
      })
      .catch((err) => console.log(err));
    onClose();
    console.log(data, image);
  };
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
  const endDateChange = (date) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setData((data) => ({
      ...data,
      endDate: formattedDate,
    }));
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>작가 포토폴리오 등록</DialogTitle>
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
                  startDateChange(newValue);
                }}
              />
              <DatePicker
                name="endDate"
                label="End"
                format="YYYY-MM-DD"
                onChange={(newValue) => {
                  endDateChange(newValue);
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
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={() => enrollLicense()}>등록</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LicenseDialog;
