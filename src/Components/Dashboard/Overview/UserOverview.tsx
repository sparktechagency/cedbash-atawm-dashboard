import YearOption from "../../../utils/YearOption";
import { useState } from "react";
import Admin_Line_Chart from "../../Chart/LineChart";

const UserOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  console.log(year);
  return (
    <div
      className="w-full p-5 bg-[#FFFFFF] rounded-lg"
      style={{ boxShadow: "0px 0px 5px 2px #0000000D" }}
    >
      <div className="flex flex-col sm:flex-row justify-between gap-5 text-base-color mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <p className="text-2xl text-base-color lg:text-3xl  mb-2 mr-5">
            Users ratio
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="bg-[#FF9815] w-3 h-3 rounded-full"></div>{" "}
              <p className="text-xl font-semibold">Users</p>
            </div>
          </div>
        </div>

        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>
      <div>
        <Admin_Line_Chart />
      </div>
    </div>
  );
};

export default UserOverview;
