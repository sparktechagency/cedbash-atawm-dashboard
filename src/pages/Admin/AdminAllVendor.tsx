import { useState } from "react";
import { VendorData } from "../../../public/data/VendorData";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import { IUser } from "../../types/userTypes";
import AdminAllVendorTable from "../../ui/Tables/AdminAllVendorTable";
import AdminViewVendorModal from "../../ui/Modal/Vendor/AdminViewVendorModal";
import AdminShowBadgeModal from "../../ui/Modal/Vendor/AdminShowBadgeModal";

const AdminAllVendor = () => {
  const data = VendorData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isShowBadgeModal, setIsShowBadgeModal] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IUser | null>(null);

  const showViewUserModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBadgeModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsShowBadgeModal(true);
  };

  const showBlockModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: IUser) => {
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

  const handleBlock = (data: IUser) => {
    console.log(data);
  };
  const handleUnblock = (data: IUser) => {
    console.log(data);
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
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          setPage={setPage}
          page={page}
          total={data.length}
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
