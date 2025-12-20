import { useState } from "react";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import AcceptModal from "../../ui/Modal/AcceptModal";
import RejectModal from "../../ui/Modal/RejectModal";
import AdminAllWithdrawTable from "../../ui/Tables/AdminAllWithdrawTable";
import WithdrawViewModal from "../../ui/Modal/Withdraw/WithdrawViewModal";
import {
  useAcceptWithdrawMutation,
  useGetAllTransactionQuery,
  useRejectWithdrawMutation,
} from "../../redux/features/withdraw/withdrawApi";
import { ITransaction } from "../../types";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllWithdraw = () => {
  const [acceptWithdraw] = useAcceptWithdrawMutation();
  const [rejectWithdraw] = useRejectWithdrawMutation();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;
  const { data, isFetching } = useGetAllTransactionQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const totalData = data?.data?.meta?.total;
  const transactions: ITransaction[] = data?.data?.data;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ITransaction | null>(null);

  const showViewUserModal = (record: ITransaction) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showRejectModal = (record: ITransaction) => {
    setCurrentRecord(record);
    setIsRejectModalVisible(true);
  };
  const showAcceptModal = (record: ITransaction) => {
    setCurrentRecord(record);
    setIsAcceptModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsRejectModalVisible(false);
    setIsAcceptModalVisible(false);
    setCurrentRecord(null);
  };

  const handleReject = async (data: ITransaction) => {
    const res = await tryCatchWrapper(
      rejectWithdraw,
      {
        params: data?._id,
      },
      "Rejecting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleAccept = async (data: ITransaction) => {
    const res = await tryCatchWrapper(
      acceptWithdraw,
      {
        params: data?._id,
      },
      "Accepting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
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
          data={transactions}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showRejectModal={showRejectModal}
          showAcceptModal={showAcceptModal}
          setPage={setPage}
          page={page}
          total={totalData}
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
