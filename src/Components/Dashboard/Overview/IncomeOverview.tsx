import { useState } from "react";
import Bar_Chart from "../../Chart/BarChart";
import YearOption from "../../../utils/YearOption";
import { useGetIncomeOverviewQuery } from "../../../redux/features/staticContent/staticContentApi";
import SpinLoader from "../../../ui/SpinLoader";

const IncomeOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data, isFetching } = useGetIncomeOverviewQuery(
    { year },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const incomeData = data?.data?.months;

  return (
    <div className="w-full p-5 bg-[#FFF0DC] rounded-lg flex flex-col mt-14">
      <div className="flex justify-between text-base-color mt-4  mb-10">
        <p className="text-2xl lg:text-3xl text-base-color">Earnings</p>
        <div>
          <YearOption currentYear={currentYear} setThisYear={setYear} />
        </div>
      </div>

      <div>
        {isFetching ? (
          <div className="flex justify-center items-center h-60">
            <SpinLoader />
          </div>
        ) : (
          <Bar_Chart incomeData={incomeData} />
        )}
      </div>
    </div>
  );
};

export default IncomeOverview;
