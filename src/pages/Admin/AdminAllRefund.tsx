import { useState } from "react";
import AdminAllRefundTable from "../../ui/Tables/AdminAllRefundTable";
import { IRefund } from "../../types";
import AdminViewRefundModal from "../../ui/Modal/AdminRefund/AdminViewRefundModal";
import { useGetAllRefundQuery } from "../../redux/features/refund/refundApi";

const AdminAllRefund = () => {
  const [page, setPage] = useState(1);

  const limit = 12;
  const { data, isFetching } = useGetAllRefundQuery({ page, limit });

  const totalData = data?.data?.meta?.total;
  const refunds: IRefund[] = data?.data?.cancellations;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<IRefund | null>(null);

  const showViewUserModal = (record: IRefund) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div>
      <div className="bg-highlight-color rounded-xl">
        <div className=" w-full px-5 pt-10 pb-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-black font-semibold">
              All Refund
            </p>
          </div>
        </div>
        <div className="mt-5">
          <AdminAllRefundTable
            data={refunds}
            loading={isFetching}
            showViewModal={showViewUserModal}
            setPage={setPage}
            page={page}
            total={totalData}
            limit={limit}
          />
          <AdminViewRefundModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllRefund;
