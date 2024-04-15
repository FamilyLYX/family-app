import { useState } from "react";

function OrderModalTable(props: any) {
  const [size, setSize] = useState("cm");

  return (
    <table className="w-full">
      <thead className="">
        <tr className="border-b-2 border-gray-200">
          <th className="text-left inline-flex px-4 py-2 leading-loose">
            Sizes <span className="w-16 text-center mr-1">({size})</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                onClick={() => {
                  size === "cm" ? setSize("inch") : setSize("cm");
                }}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[8px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-600 hover:peer-checked:bg-gray-700"></div>
            </label>
          </th>
          {props.data.map((item: any, index: number) => (
            <th className="text-left px-2 py-2 uppercase" key={index}>
              {item.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.columns.map((prop: any, index: number) => (
          <tr key={index} className="border-b-2 border-gray-200 leading-loose last:border-none">
            <td className="px-4 py-2 capitalize">{prop.replace('_', ' ')}</td>
            {props.data.map((item: any, idx: number) => (
              <td className="px-4 py-2" key={idx}>
                {size === 'cm' ? item[prop] : (item[prop]*0.3937).toFixed(1)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderModalTable;
