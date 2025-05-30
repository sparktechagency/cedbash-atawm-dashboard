import { useState } from "react";
import transactionsData from "../../../public/data/TransationData";
import TransactionsTable from "../../ui/Tables/TransactionTable";
import TransactionsViewModal from "../../ui/Modal/Transaction/TransactionsViewModal";
import { AllImages } from "../../../public/images/AllImages";

const overview = [
  {
    title: "Today Income",
    amount: "$ 1,000",
    icon: AllImages.todayIncome,
  },
  {
    title: "Total Income",
    amount: "$10000",
    icon: AllImages.totalIncome,
  },
];

const AdminAllEarning = () => {
  const data = transactionsData;
  const [page, setPage] = useState(1);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewUserModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };
  return (
    <div className=" bg-primary-color rounded-xl ">
      <div className="my-5 grid grid-cols-2  gap-5">
        {overview.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-5 text-base-color bg-[#FFDFB6] rounded-lg py-5 px-8 w-full"
          >
            <div className="p-4 bg-[#D2F6FF] rounded-3xl">
              <img src={item.icon} alt="" className="w-10 h-auto" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg sm:text-xl lg:text-2xl font-medium text-[#333333]">
                {item.title}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#000000]">
                {item.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 bg-primary-color rounded-xl ">
        <TransactionsTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
        <TransactionsViewModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminAllEarning;
