import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getDeliveryCompanies } from "../../../axios/Orders";

const DeliveryDialog = ({ open, onClose, orderId }) => {
  const [international, setInternational] = useState(false);
  const [deliveryCompanies, setDeliveryCompanies] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({});

  useEffect(() => {
    getDeliveryList(international);
  }, []);

  const getDeliveryList = (international) => {
    getDeliveryCompanies(international).then((res) => {
      const prevData = res?.data;
      setInternational(prevData.meta.international);
      setDeliveryCompanies(prevData.documents);
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleChangeInternational = (e) => {
    const prevData = e.target.value;
    setInternational(prevData);
    getDeliveryList(international);
  };

  const handleChangeDeliveryInfo = (e) => {
    console.log(e.target.value, orderId);
    setDeliveryInfo({ [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>송장 등록</DialogTitle>
      <DialogContent style={{ padding: "10px" }}>
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="international-label">국내/외</InputLabel>
            <Select
              id="international-label"
              labelId="international-label"
              value={international}
              label="국내/외"
              onChange={handleChangeInternational}
            >
              <MenuItem value={false}>국내</MenuItem>
              <MenuItem value={true}>국제</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="delivery-company-label">택배사</InputLabel>
            <Select
              id="delivery-company-label"
              labelId="delivery-company-label"
              label="택배사"
              onChange={handleChangeDeliveryInfo}
              name="courierCompanyName"
            >
              {deliveryCompanies?.map((deliveryComapany) => {
                return (
                  <MenuItem
                    key={deliveryComapany.courierCode}
                    value={deliveryComapany?.courierName}
                    name="courierCompanyName"
                  >
                    {deliveryComapany?.courierName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="송장 번호"
            variant="outlined"
            name="trackingNumber"
            onChange={handleChangeDeliveryInfo}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeliveryDialog;
