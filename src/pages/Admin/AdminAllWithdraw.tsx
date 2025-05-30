import { useState } from "react";
import { withdrawData } from "../../../public/data/WithdrawData";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import { IUser } from "../../types/userTypes";
import AcceptModal from "../../ui/Modal/AcceptModal";
import RejectModal from "../../ui/Modal/RejectModal";
import AdminAllWithdrawTable from "../../ui/Tables/AdminAllWithdrawTable";
import WithdrawViewModal from "../../ui/Modal/Withdraw/WithdrawViewModal";

const AdminAllWithdraw = () => {
  const data = withdrawData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IUser | null>(null);

  const showViewUserModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showRejectModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsRejectModalVisible(true);
  };
  const showAcceptModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsAcceptModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsRejectModalVisible(false);
    setIsAcceptModalVisible(false);
    setCurrentRecord(null);
  };

  const handleReject = (data: IUser) => {
    console.log(data);
  };
  const handleAccept = (data: IUser) => {
    console.log(data);
  };
  return (
    <div>
      <div className=" bg-[#FFF0DC] rounded-xl ">
        <div className=" w-full px-5 pt-10 pb-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-[base-color] font-semibold">
              Withdraw List
            </p>
            <div className="h-fit">
              <SearchInput
                placeholder="Search ..."
                setSearch={setSearchText}
                setPage={setPage}
              />
            </div>
          </div>
        </div>

        <AdminAllWithdrawTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          showRejectModal={showRejectModal}
          showAcceptModal={showAcceptModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
        <WithdrawViewModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <AcceptModal
          isAcceptModalVisible={isAcceptModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleAccept={handleAccept}
        />
        <RejectModal
          isRejectModalVisible={isRejectModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleReject={handleReject}
        />
      </div>
    </div>
  );
};

export default AdminAllWithdraw;
