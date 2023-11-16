// ChipSelect.tsx
import React from "react";

interface ChipSelectProps {
  options: string[];
  selectedOption: string;
  onChange: (option: string) => void;
}

const ChipSelect: React.FC<ChipSelectProps> = ({
  options = [],
  selectedOption = "",
  onChange,
}) => {
  return (
    <div className="flex flex-wrap space-x-2">
      {options.map((option) => (
        <button
          key={option}
          className={`w-20 px-2 py-3 rounded-full text-sm font-bold border-2 ${
            selectedOption === option
              ? "bg-black text-white border-black"
              : "text-black hover:bg-gray-100 transition-colors duration-200 border-gray-300"
          }`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ChipSelect;
