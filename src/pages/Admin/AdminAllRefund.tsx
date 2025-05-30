import { useState } from "react";
import { RefundData } from "../../../public/data/RefundData";
import AdminViewReviewModal from "../../ui/Modal/Review/AdminViewReviewModal";
import { ReviewType } from "../../types/ReviewType";
import AdminAllRefundTable from "../../ui/Tables/AdminAllRefundTable";

const AdminAllRefund = () => {
  const data = RefundData;
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<ReviewType | null>(null);

  const showViewUserModal = (record: ReviewType) => {
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
            data={data}
            loading={false}
            showViewModal={showViewUserModal}
            setPage={setPage}
            page={page}
            total={data.length}
            limit={limit}
          />
          <AdminViewReviewModal
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
