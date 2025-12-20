/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { FiPlus } from "react-icons/fi";
import AddAdminModal from "../../ui/Modal/AdminAllAdmin/AddAdminModal";
import ViewAdminModal from "../../ui/Modal/AdminAllAdmin/ViewAdminModal";
import { useGetAdminQuery } from "../../redux/features/allAdmin/allAdminApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useActionUserMutation } from "../../redux/features/users/usersApi";
import AdminAllAdminTable from "../../ui/Tables/AdminAllAdminTable";

const AdminAllAdmin = () => {
  const [userAction] = useActionUserMutation();

  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const { data, isFetching } = useGetAdminQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const allAdminData = data?.data?.admins;
  const allAdminPagination = data?.data?.meta?.total;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (data: any) => {
    console.log(data);

    const res = await tryCatchWrapper(
      userAction,
      {
        params: data?._id,
      },
      "Blocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (data: any) => {
    console.log(data);
    const res = await tryCatchWrapper(
      userAction,
      {
        params: data?._id,
      },
      "Unblocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <div className="bg-highlight-color rounded-xl min-h-[90vh] ">
      <div className=" w-full px-5 pt-10 pb-5 rounded-tl-xl rounded-tr-xl">
        <div className="flex justify-between items-center mb-5">
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-black font-semibold">
            Admin List
          </p>
          <div className="h-fit">
            <ReuseButton
              variant="secondary"
              className="!py-4.5"
              onClick={showAddModal}
            >
              <FiPlus className="!text-bas" /> Add New Admin
            </ReuseButton>
          </div>
        </div>
        <div className="flex justify-end items-center mb-5">
          <div className="h-fit">
            <ReuseSearchInput
              placeholder="Search Admin..."
              setSearch={setSearchText}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      <div className="border-2 border-[#e1e1e1] rounded-xl rounded-tr-xl">
        <AdminAllAdminTable
          data={allAdminData}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={allAdminPagination?.total}
          limit={limit}
        />
      </div>
      <AddAdminModal
        isAddModalVisible={isAddModalVisible}
        handleCancel={handleCancel}
      />

      <ViewAdminModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
      <BlockModal
        isBlockModalVisible={isBlockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleBlock={handleBlock}
        description=" Are You Sure You want to Block This Admin ?"
      />
      <UnblockModal
        isUnblockModalVisible={isUnblockModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
        handleUnblock={handleUnblock}
        description=" Are You Sure You want to Unblock This Admin ?"
      />
    </div>
  );
};

export default AdminAllAdmin;
