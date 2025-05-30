import { useState } from "react";
import { VendorRequestData } from "../../../public/data/VendorRequestData";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import { IUser } from "../../types/userTypes";
import AdminVendorRequestTable from "../../ui/Tables/AdminVendorRequestTable";
import AdminVendorRequestModal from "../../ui/Modal/Vendor/AdminVendorRequestModal";

const AdminAllVendorRequest = () => {
  const data = VendorRequestData;
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IUser | null>(null);

  const showViewUserModal = (record: IUser) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div>
      <div className=" bg-[#FFF0DC] rounded-xl ">
        <div className=" w-full px-5 pt-10 pb-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-[base-color] font-semibold">
              Vendor Request
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

        <AdminVendorRequestTable
          data={data}
          loading={false}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={data.length}
          limit={limit}
        />
        <AdminVendorRequestModal
          isUserViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminAllVendorRequest;
