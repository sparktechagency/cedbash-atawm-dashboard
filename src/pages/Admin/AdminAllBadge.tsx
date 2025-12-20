import { useState } from "react";
import ReuseButton from "../../ui/Button/ReuseButton";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddBadge from "../../ui/Modal/AdminBadge/AddBadge";
import EditBadge from "../../ui/Modal/AdminBadge/EditBadge";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useDeleteBadgeMutation,
  useGetAllBadgeQuery,
} from "../../redux/features/badge/badgeApi";
import Loading from "../../ui/Loading";
import { IBadge } from "../../types";
import { getImageUrl } from "../../helpers/config/envConfig";
import { AllImages } from "../../../public/images/AllImages";

const AdminAllBadge = () => {
  const serverUrl = getImageUrl();
  const { data, isFetching } = useGetAllBadgeQuery({});

  const allBadges: IBadge[] = data?.data;

  const [deleteBadge] = useDeleteBadgeMutation({});
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IBadge | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record: IBadge) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: IBadge) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (data: IBadge) => {
    const res = await tryCatchWrapper(
      deleteBadge,
      {
        params: data?._id,
      },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <div>
      <div className="bg-highlight-color rounded-xl min-h-[90vh]">
        <div className=" w-full px-5 pt-10 pb-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-black font-semibold">
              All Badges
            </p>
            <ReuseButton
              className="!w-fit"
              variant="secondary"
              onClick={showAddModal}
            >
              Add New Badge
            </ReuseButton>
          </div>
        </div>
        <div className="mt-10 flex items-center gap-5 flex-wrap px-5">
          {isFetching ? (
            <Loading />
          ) : (
            allBadges?.map((item) => (
              <div
                className="flex flex-col items-center gap-2 bg-[#F5F5F5] p-5 rounded-2xl"
                key={item._id}
              >
                <img
                  src={
                    item.image?.length > 0
                      ? serverUrl + item.image
                      : AllImages?.defaultCover
                  }
                  alt="Badge"
                  className="w-20 h-20 object-cover "
                />
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color">
                  {item?.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <ReuseButton
                    variant="outline"
                    className="!text-base !px-4 !py-3"
                    onClick={() => showEditModal(item)}
                  >
                    Edit
                  </ReuseButton>
                  <ReuseButton
                    variant="error"
                    className="!text-base !px-4 !py-3"
                    onClick={() => showDeleteModal(item)}
                  >
                    Delete
                  </ReuseButton>
                </div>
              </div>
            ))
          )}
        </div>
        <AddBadge
          isAddModalVisible={isAddModalVisible}
          handleCancel={handleCancel}
        />
        <EditBadge
          isEditModalVisible={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleDelete={handleDelete}
          description="Are You Sure You want to Delete This?"
        />
      </div>
    </div>
  );
};

export default AdminAllBadge;
