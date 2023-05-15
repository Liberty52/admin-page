import { Dialog } from "@mui/material";

export const ReviewDialog = (props) => {
  const { open, handleClose, id, isChanged } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      maxWidth={"lg"}
      scroll={"body"}
    >
      {id !== undefined && <div>리뷰 다이어로그</div>}
    </Dialog>
  );
};
