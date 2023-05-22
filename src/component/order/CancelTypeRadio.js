import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";

export default function CancelTypeRadio({ onChange }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    onChange(v);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="radio-group"
        name="cancel-type"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="" control={<Radio />} label="전체 조회" />
        <FormControlLabel
          value="CANCELED"
          control={<Radio />}
          label="주문 취소"
        />
        <FormControlLabel
          value="REQUESTED"
          control={<Radio />}
          label="환불 요청"
        />
      </RadioGroup>
    </FormControl>
  );
}
