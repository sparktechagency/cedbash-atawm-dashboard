import { useState } from "react";
import Bar_Chart from "../../Chart/BarChart";
import YearOption from "../../../utils/YearOption";

const IncomeOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  console.log(year);
  return (
    <div className="w-full p-5 bg-[#FFF0DC] rounded-lg flex flex-col mt-10">
      <div className="flex justify-between text-base-color mt-4  mb-10">
        <p className="text-2xl lg:text-3xl text-base-color">Earnings</p>
        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>

      <div>
        <Bar_Chart />
      </div>
    </div>
  );
};

export default IncomeOverview;
