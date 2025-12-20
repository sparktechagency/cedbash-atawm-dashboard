import { useState } from "react";
import AdminAllReviewTable from "../../ui/Tables/AdminAllReviewTable";
import AdminViewReviewModal from "../../ui/Modal/Review/AdminViewReviewModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import { useGetAllFeedbackQuery } from "../../redux/features/feedback/feedbackApi";
import { IFeedback } from "../../types";

const AdminAllReview = () => {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isFetching } = useGetAllFeedbackQuery({ page, limit });

  const totalData = data?.data?.meta?.total;
  const reviews: IFeedback[] = data?.data?.reviews;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<IFeedback | null>(null);

  const showViewUserModal = (record: IFeedback) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: IFeedback) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (data: IFeedback) => {
    console.log(data);
  };
  return (
    <div>
      <div className="bg-highlight-color rounded-xl">
        <div className=" w-full px-5 pt-10 pb-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-black font-semibold">
              Feedback
            </p>
          </div>
        </div>
        <div className="mt-5">
          <AdminAllReviewTable
            data={reviews}
            loading={isFetching}
            showViewModal={showViewUserModal}
            showDeleteModal={showDeleteModal}
            setPage={setPage}
            page={page}
            total={totalData}
            limit={limit}
          />
          <AdminViewReviewModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
          <DeleteModal
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
            handleDelete={() => handleDelete(currentRecord as IFeedback)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminAllReview;
