import { useState } from "react";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import AdminAllVendorTable from "../../ui/Tables/AdminAllVendorTable";
import AdminViewVendorModal from "../../ui/Modal/Vendor/AdminViewVendorModal";
import AdminShowBadgeModal from "../../ui/Modal/Vendor/AdminShowBadgeModal";
import { IVendorUser } from "../../types";
import { useGetAllVendorQuery } from "../../redux/features/vendor/vendorApi";
import { useActionUserMutation } from "../../redux/features/users/usersApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAllVendor = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const limit = 12;

  const [userAction] = useActionUserMutation();

  const { data, isFetching } = useGetAllVendorQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const allUsers: IVendorUser[] = data?.data?.users;
  const totalData = data?.data?.meta?.total;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isShowBadgeModal, setIsShowBadgeModal] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IVendorUser | null>(null);

  const showViewUserModal = (record: IVendorUser) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBadgeModal = (record: IVendorUser) => {
    setCurrentRecord(record);
    setIsShowBadgeModal(true);
  };

  const showBlockModal = (record: IVendorUser) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: IVendorUser) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setIsShowBadgeModal(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (data: IVendorUser) => {
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
  const handleUnblock = async (data: IVendorUser) => {
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
    <div>
      <div className=" bg-[#FFF0DC] rounded-xl ">
        <div className=" w-full px-5 pt-10 pb-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-[base-color] font-semibold">
              Vendor List
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

        <AdminAllVendorTable
          data={allUsers}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={totalData}
          limit={limit}
        />
        <AdminViewVendorModal
          isUserViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          showBadgeModal={showBadgeModal}
        />
        <BlockModal
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
          description=" Are You Sure You want to Block This Player?"
        />
        <UnblockModal
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleUnblock={handleUnblock}
          description=" Are You Sure You want to Unblock This Player?"
        />
        <AdminShowBadgeModal
          isShowBadgeModal={isShowBadgeModal}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminAllVendor;
