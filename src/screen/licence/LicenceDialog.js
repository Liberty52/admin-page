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
// {
//   "artistName" : "박찬길",
//   "workName" : "별이 빛나는 밤",
//   "startDate" : "2023-01-01T00:00:00",
//   "endDate" : "2023-12-31T23:59:59",
//   "stock" : 5
// }
const LicenceDialog = (props) => {
  const { open, onClose } = props;
  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>작가 포토폴리오 등록</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="artistName"
            label="작가 이름"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="workName"
            label="작품 이름"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="수량"
            fullWidth
            variant="outlined"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label="Start" />
              <DatePicker label="End" />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>등록</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LicenceDialog;
