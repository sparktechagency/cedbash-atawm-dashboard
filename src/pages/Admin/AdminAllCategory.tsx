import { useState } from "react";
import ReuseButton from "../../ui/Button/ReuseButton";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddCategory from "../../ui/Modal/AdminCategory/AddCategory";
import EditCategory from "../../ui/Modal/AdminCategory/EditCategory";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../redux/features/category/categoryApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import { ICategory } from "../../types";
import { AllImages } from "../../../public/images/AllImages";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Loading from "../../ui/Loading";

const AdminAllCategory = () => {
  const serverUrl = getImageUrl();
  const { data, isFetching } = useGetAllCategoryQuery({});
  const [deleteCategory] = useDeleteCategoryMutation({});

  const allCategories: ICategory[] = data?.data;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<ICategory | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record: ICategory) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: ICategory) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (data: ICategory) => {
    const res = await tryCatchWrapper(
      deleteCategory,
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
              All Category
            </p>
            <ReuseButton
              className="!w-fit"
              variant="secondary"
              onClick={showAddModal}
            >
              Add New Category
            </ReuseButton>
          </div>
        </div>
        <div className="mt-10 flex items-center gap-5 flex-wrap px-5">
          {isFetching ? (
            <Loading />
          ) : (
            allCategories?.map((item) => (
              <div
                className="flex flex-col items-center gap-2 bg-[#F5F5F5] p-5 rounded-2xl"
                key={item?._id}
              >
                <img
                  src={
                    item?.image?.length > 0
                      ? serverUrl + item?.image
                      : AllImages?.defaultCover
                  }
                  alt="category"
                  className="w-16 h-auto"
                />
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color">
                  {item?.categoryName}
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
        <AddCategory
          isAddModalVisible={isAddModalVisible}
          handleCancel={handleCancel}
        />
        <EditCategory
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

export default AdminAllCategory;
