import { useState } from "react";

type Opt = {
  title:string;
  children:any;
}
const FaqAccordian = (opt:Opt) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t-2  ">
      <div className="flex justify-between items-center p-4  cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-lg font-normal-500">{opt.title}</h2>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 10l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {isOpen && <div className="p-2 text-[#000000BF] font-normal-400 leading-4">{opt.children}</div>}
    </div>
  );
};

export default FaqAccordian;
