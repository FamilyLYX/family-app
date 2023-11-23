import React from "react";
import {
  Select as MuiSelect,
  MenuItem,
  // InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

interface Select {
  data: { label: string; value: string }[];
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  placeholder: string;
}

const Select: React.FC<Select> = ({
  data,
  value = "",
  onChange,
  placeholder = "",
}) => {
  return (
    <FormControl
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#e0e0e0", // default border color
          },
          "&:hover fieldset": {
            borderColor: "#d8d8d8", // border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#adadad", // border color on focus
            borderWidth: "2px", // you can change the border width on focus
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#adadad",
            borderWidth: "2px",
          },
        },
      }}
    >
      <MuiSelect
        displayEmpty
        sx={{ borderRadius: "50px", padding: "0 15px", minWidth: "180px" }}
        classes={{ icon: "mr-4" }}
        value={value}
        onChange={onChange}
        IconComponent={FaChevronDown}
      >
        {placeholder !== "" && (
          <MenuItem value="" disabled>
            <div className="font-semibold">{placeholder}</div>
          </MenuItem>
        )}
        {data.map(({ label, value }) => (
          <MenuItem value={value} key={value}>
            <div className="font-semibold">{label}</div>
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
