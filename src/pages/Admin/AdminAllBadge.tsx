/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddBadge from "../../ui/Modal/AdminBadge/AddBadge";
import EditBadge from "../../ui/Modal/AdminBadge/EditBadge";

const data = [
  {
    id: 1,
    name: "Level 1",
    images: AllImages.badge,
  },
];

const AdminAllBadge = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (data: any) => {
    console.log(data);
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
          {data?.map((item) => (
            <div
              className="flex flex-col items-center gap-2 bg-[#F5F5F5] p-5 rounded-2xl"
              key={item.id}
            >
              <img src={item.images} alt="Badge" className="w-auto h-auto" />
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color">
                {item.name}
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
          ))}
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
