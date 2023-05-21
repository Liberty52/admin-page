import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";

export default function CancelTypeRadio({ onChange }) {
  const [value, setValue] = useState("CANCELED");

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
        <FormControlLabel
          value="CANCELED"
          control={<Radio />}
          label="CANCELED"
        />
        <FormControlLabel
          value="REQUESTED"
          control={<Radio />}
          label="REQUESTED"
        />
      </RadioGroup>
    </FormControl>
  );
}
