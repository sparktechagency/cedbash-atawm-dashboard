import { AllImages } from "../../../../public/images/AllImages";

const data = [
  {
    id: 1,
    background: "#FFDFB6",
    name: "Total Income",

    icon: (
      <div className="flex items-center gap-2 px-3 py-4 rounded-full bg-[#DDE0FF]">
        <img src={AllImages.earning} alt="" className="w-7 h-auto" />
      </div>
    ),
    count: "$2500",
  },
  {
    id: 2,
    background: "#FFDFB6",
    name: "Total Servics",
    icon: (
      <div className="flex items-center gap-2 p-3 rounded-full bg-[#D2F6FF]">
        <img src={AllImages.service} alt="" className="w-7 h-auto" />
      </div>
    ),
    count: 10000,
  },
  {
    id: 3,
    background: "#FFDFB6",
    name: "Total Users",
    icon: (
      <div className="flex items-center gap-2 px-3 py-4 rounded-full bg-[#DDE0FF]">
        <img src={AllImages.users} alt="" className="w-7 h-auto" />
      </div>
    ),
    count: 10000,
  },
  {
    id: 4,
    background: "#FFDFB6",
    name: "Total Vendors",
    icon: (
      <div className="flex items-center gap-2 p-3 rounded-full bg-[#FFCEB0]">
        <img src={AllImages.vendor} alt="" className="w-7 h-auto" />
      </div>
    ),
    count: 10000,
  },
];

const OverviewCard = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <img
          src={AllImages.profile}
          alt=""
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color">
            Devid Wilson
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-[#535763]">
            Check your activities in this dashboard.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-1 lg:gap-5 mb-5 !text-secondary-color">
        {/* Company  */}
        {data.map((item) => (
          <div
            key={item.id}
            className={`flex rounded-2xl w-full my-2 lg:my-0 items-center justify-center flex-1`}
            style={{
              backgroundColor: item.background,
            }}
          >
            <div className="flex items-center p-5 justify-center w-full gap-3">
              {item.icon}
              <div className=" w-fit flex flex-col justify-center items-start text-center gap-1 ">
                <p className="text-xl sm:text-2xl lg:text-3xl  font-bold capitalize tracking-wider text-[#50525D]">
                  {item.count}
                </p>
                <p className="text-base sm:text-lg lg:text-xl  font-medium mb-1  tracking-tight text-[#535763]">
                  {item.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCard;
