import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

interface ColorSelectInputProps {
  data: { hexCode: string; title: string }[];
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const ColorSelectInput: React.FC<ColorSelectInputProps> = ({
  data,
  value = "",
  onChange,
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
      <Select
        sx={{ borderRadius: "50px", padding: "0 15px" }}
        classes={{ icon: "mr-4" }}
        value={value}
        onChange={onChange}
        IconComponent={FaChevronDown}
        displayEmpty
      >
        <MenuItem value="" disabled>
          <div className="font-bold">Color</div>{" "}
        </MenuItem>
        {data.map(({ hexCode, title }) => (
          <MenuItem value={hexCode} key={hexCode}>
            <div
              className="font-semibold"
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                style={{
                  backgroundColor: hexCode,
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  marginRight: "8px",
                }}
              ></span>
              {title}
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ColorSelectInput;
