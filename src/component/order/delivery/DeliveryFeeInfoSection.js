import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function DeliveryFeeInfoSection() {
  const fee = "100,000";

  const [editMode, setEditMode] = useState(false);
  const [originFee, setOriginFee] = useState(0);
  const [isEditChanged, setIsEditChanged] = useState(false);
  const [editFee, setEditFee] = useState(0);
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
    alert(`${editFee}로 변경 요청`);
    // refetch
    resetEditMode();
  };

  const handleCancelEditMode = () => {
    resetEditMode();
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
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
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
            <Button disabled={!isEditChanged} onClick={handleEdit}>
              수정
            </Button>
            <Button onClick={handleCancelEditMode}>취소</Button>
          </Stack>
        ) : null}
      </Box>
    </>
  );
}
