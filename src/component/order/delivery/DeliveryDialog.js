import { Dialog, DialogTitle } from "@mui/material";

const DeliveryDialog = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>송장 등록</DialogTitle>
    </Dialog>
  );
};

export default DeliveryDialog;
