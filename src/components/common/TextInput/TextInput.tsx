import React from "react";
import { Input, FormControl, InputAdornment, InputLabel } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TextInput: React.FC<InputProps> = ({
  value = "",
  onChange,
  placeholder = "",
}) => {
  return (
    <input
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="w-full border border-gray-300/80 rounded-xl  p-4 text-gray-700 focus:outline-none focus:ring-opacity-50"
    />
  );
};

export default TextInput;
