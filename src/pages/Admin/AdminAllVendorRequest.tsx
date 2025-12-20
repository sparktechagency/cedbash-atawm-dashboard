import { useState } from "react";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import AdminVendorRequestTable from "../../ui/Tables/AdminVendorRequestTable";
import AdminVendorRequestModal from "../../ui/Modal/Vendor/AdminVendorRequestModal";
import { IVendorUser } from "../../types";
import { useGetAllVendorReqQuery } from "../../redux/features/vendor/vendorApi";

const AdminAllVendorRequest = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  const limit = 12;

  const { data, isFetching } = useGetAllVendorReqQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  console.log(data);

  const totalData = data?.data?.meta?.total;
  const vendors: IVendorUser[] = data?.data?.users;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<IVendorUser | null>(null);

  const showViewUserModal = (record: IVendorUser) => {
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
          data={vendors}
          loading={isFetching}
          showViewModal={showViewUserModal}
          setPage={setPage}
          page={page}
          total={totalData}
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
