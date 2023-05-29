import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import {getDefaultDeliveryFee, patchDefaultDeliveryFee} from "../../../axios/Orders";

export default function DeliveryFeeInfoSection() {

  const [editMode, setEditMode] = useState(false);
  const [fee, setFee] = useState("");
  const [originFee, setOriginFee] = useState(0);
  const [isEditChanged, setIsEditChanged] = useState(false);
  const [editFee, setEditFee] = useState(0);

  useEffect(() => {
    fetchDefaultFee();
  }, []);

  const fetchDefaultFee = () => {
    getDefaultDeliveryFee()
        .then((res) => {
          setFee(res.data.fee);
        })
        .catch((err) => alert(`배송비 조회 실패.\n${err.response.data.errorMessage}`));
  }

  const resetEditMode = () => {
    setIsEditChanged(false);
    setOriginFee(0);
    setEditFee(0);
    setEditMode(false);
  };

  const handleEditFee = () => {
    const nFee = fee.replaceAll(",", "");
    setOriginFee(Number(nFee));
    setEditMode(true);
  };

  const handleFeeChanged = (e) => {
    const newFee = Number(e.target.value);
    setIsEditChanged(originFee !== newFee);
    setEditFee(newFee);
  };

  const handleEdit = () => {
    patchDefaultDeliveryFee({fee: editFee})
        .then((res) => {
          fetchDefaultFee();
          resetEditMode();
        })
        .catch((err) => alert(`배송비 수정 실패.\n${err.response.data.errorMessage}`));
    resetEditMode();
  };

  const handleCancelEditMode = () => {
    resetEditMode();
  };

  return (
    <>
      <Stack
          direction={"row"} spacing={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <h2>배송비 관리</h2>
          <IconButton
            aria-label="edit"
            id="edit-button"
            onClick={handleEditFee}
            sx={{
              color: blue[500],
            }}
          >
            <EditIcon />
          </IconButton>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-start",}}>
        <Stack direction={"row"} spacing={2} sx={{alignItems: "center"}}>
          <p>현재 배송비: </p>
          {editMode ? (
              <TextField
                  type="number"
                  defaultValue={originFee}
                  onChange={handleFeeChanged}
              />
          ) : (
              <p>{`${fee}원`}</p>
          )}
          {editMode ? (
              <Stack direction="row" spacing={1}>
                <Button disabled={!isEditChanged} onClick={handleEdit} sx={{minWidth: "50px"}}>
                  수정
                </Button>
                <Button onClick={handleCancelEditMode} sx={{minWidth: "50px"}}>취소</Button>
              </Stack>
          ) : null}
        </Stack>
      </Box>
    </>
  );
}
