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
import {
  createTrackingInfo,
  getDeliveryCompanies,
} from "../../../axios/Orders";

const DeliveryDialog = ({ open, onClose, orderId }) => {
  const [international, setInternational] = useState(false);
  const [deliveryCompanies, setDeliveryCompanies] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState({});

  useEffect(() => {
    getDeliveryList(international);
  }, [international]);

  const getDeliveryList = (international) => {
    getDeliveryCompanies(international).then((res) => {
      const prevData = res?.data;
      setDeliveryCompanies(prevData.documents);
    });
  };

  const handleClose = () => {
    onClose();
  };

  const handleChangeInternational = (e) => {
    const prevData = e.target.value;
    setInternational(prevData);
    setDeliveryCompanies([]);
  };

  const handleChangeDeliveryInfo = (e) => {
    if (e.target.name === undefined) {
      const prevData = e.target.value;
      setDeliveryInfo(prevData);
    } else {
      setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
    }
  };

  const changeDeliveryInfoKey = () => {
    deliveryInfo.courierCompanyCode = deliveryInfo.courierCode;
    deliveryInfo.courierCompanyName = deliveryInfo.courierName;
    delete deliveryInfo.courierCode;
    delete deliveryInfo.courierName;
  };

  const createDeliveryInfo = () => {
    changeDeliveryInfoKey();
    createTrackingInfo(orderId, deliveryInfo).then(() => {
      alert("송장이 성공적으로 등록되었습니다!");
    });
    onClose();
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
              label="국내/외"
              value={international}
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
            >
              {deliveryCompanies?.map((deliveryCompany) => {
                return (
                  <MenuItem
                    key={deliveryCompany.courierCode}
                    value={deliveryCompany}
                  >
                    {deliveryCompany?.courierName}
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
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => createDeliveryInfo()}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeliveryDialog;
