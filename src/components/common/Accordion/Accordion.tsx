import React from "react";
import { Transition, Disclosure } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

// TypeScript interfaces
interface AccordionProps {
  title: string;
  data: Array<AccordionItem>;
}

interface AccordionItem {
  question: string;
  answer: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow overflow-hidden">
      <div className="px-4 py-5 sm:px-6 text-5xl font-semibold text-center text-gray-900 bg-white">
        {title}
      </div>
      {data.map((item, index) => (
        <Disclosure
          key={item.question + index}
          as="div"
          className="bg-gray-200/10 my-3"
        >
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-700 focus:outline-none px-6 py-3 transition-colors duration-200 ease-in-out hover:bg-gray-300/10 rounded-2xl ">
                <span>{item.question}</span>
                <FaChevronDown
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-4 h-4 text-gray-700`}
                />
              </Disclosure.Button>
              <Transition
                as={React.Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="pb-4 pt-2 text-md text-gray-900 px-6">
                  {item.answer}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default Accordion;
