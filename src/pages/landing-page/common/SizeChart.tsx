const SizeChart = () => {
  // Data for sizes in centimeters
  const sizesCm = [
    { label: "A Sleeve length", xs: "75", s: "77", m: "79", l: "81", xl: "84" },
    { label: "B Body width", xs: "55.5", s: "58", m: "60", l: "63", xl: "65" },
    { label: "C Body length", xs: "69", s: "73", m: "76", l: "78", xl: "83" },
  ];

  // Data for sizes in inches
  const sizesIn = [
    {
      label: "A Sleeve length",
      xs: '29.5"',
      s: '30"',
      m: '31"',
      l: '31.9"',
      xl: '33"',
    },
    {
      label: "B Body width",
      xs: '21.9"',
      s: '22.8"',
      m: '23.6"',
      l: '24.8"',
      xl: '25.6"',
    },
    {
      label: "C Body length",
      xs: '27.2"',
      s: '28.7"',
      m: '29.9"',
      l: '30.7"',
      xl: '32.7"',
    },
  ];

  // Render the table rows for a given data array
  const renderRows = (data: any) =>
    data.map((item: any, index: any) => (
      <tr key={index} className="border-b border-gray-300">
        <th scope="row" className="py-2 px-4 text-left">
          {item.label}
        </th>
        <td className="py-2 px-4">{item.xs}</td>
        <td className="py-2 px-4">{item.s}</td>
        <td className="py-2 px-4">{item.m}</td>
        <td className="py-2 px-4">{item.l}</td>
        <td className="py-2 px-4">{item.xl}</td>
      </tr>
    ));

  return (
    <div className="overflow-hidden rounded-lg shadow-md  text-white">
      {/* Sizes in centimeters */}
      <div className="bg-gray-50/5 overflow-hidden rounded-xl mb-4">
        <table className="w-full">
          <thead>
            <tr className="text-sm ">
              <th className="text-left py-2 px-4">Sizes (cm)</th>
              <th className="py-1 px-1">XS</th>
              <th className="py-1 px-1">S</th>
              <th className="py-1 px-1">M</th>
              <th className="py-1 px-1">L</th>
              <th className="py-1 px-1">XL</th>
            </tr>
          </thead>
          <tbody>{renderRows(sizesCm)}</tbody>
        </table>
      </div>

      {/* Divider */}
      {/* <div className="my-2 bg-gray-700" style={{ height: "2px" }}></div> */}

      {/* Sizes in inches */}
      <div className="bg-gray-50/5  rounded-xl">
        <table className="w-full ">
          <thead>
            <tr className="text-sm ">
              <th className="text-left py-3 px-4">Sizes (in)</th>
              <th className="py-1 px-1">XS</th>
              <th className="py-1 px-1">S</th>
              <th className="py-1 px-1">M</th>
              <th className="py-1 px-1">L</th>
              <th className="py-1 px-1">XL</th>
            </tr>
          </thead>
          <tbody>{renderRows(sizesIn)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeChart;
