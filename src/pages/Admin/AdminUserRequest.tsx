/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import SearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import { AllImages } from "../../../public/images/AllImages";
import ReuseButton from "../../ui/Button/ReuseButton";

const requestData = [
  {
    id: 1,
    fullName: "John Doe",
    image: AllImages.profile,
  },
  {
    id: 2,
    fullName: "Jane Smith",
    image: AllImages.profile,
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    image: AllImages.profile,
  },
  {
    id: 4,
    fullName: "Bob Brown",
    image: AllImages.profile,
  },
  {
    id: 5,
    fullName: "Charlie White",
    image: AllImages.profile,
  },
  {
    id: 6,
    fullName: "David Black",
    image: AllImages.profile,
  },
  {
    id: 7,
    fullName: "Eve Green",
    image: AllImages.profile,
  },
  {
    id: 8,
    fullName: "Frank Blue",
    image: AllImages.profile,
  },
  {
    id: 9,
    fullName: "Grace Yellow",
    image: AllImages.profile,
  },
  {
    id: 10,
    fullName: "Hank Purple",
    image: AllImages.profile,
  },
  {
    id: 11,
    fullName: "Ivy Orange",
    image: AllImages.profile,
  },
  {
    id: 12,
    fullName: "Jack Pink",
    image: AllImages.profile,
  },
];

const AdminUserRequest = () => {
  const [page, setPage] = useState(1);
  console.log(page);
  const [searchText, setSearchText] = useState("");
  console.log(searchText);

  //   const limit = 12;

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <div
        className=" bg-primary-color rounded-xl min-h-[90vh] "
        style={{ boxShadow: "0px 0px 5px 1px #0000000D" }}
      >
        <div className="bg-secondary-color w-full p-5 rounded-tl-xl rounded-tr-xl">
          <div className=" flex items-center justify-between">
            <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-primary-color font-semibold">
              All Users Request
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
        <div className="py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
          {requestData.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-center gap-5 p-7 "
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.image}
                  alt={user.fullName}
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
                  {user.fullName}
                </p>
                <div className="flex items-center gap-3">
                  <ReuseButton
                    url={`/admin/user-request/${user.id}`}
                    className="!text-base !px-4 !py-2"
                    variant="secondary"
                  >
                    Details
                  </ReuseButton>
                  <ReuseButton
                    className="!text-base !px-4 !py-2"
                    variant="outline"
                    onClick={() => showDeleteModal(user)}
                  >
                    Delete
                  </ReuseButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DeleteModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleDelete={handleDelete}
          description=" Are You Sure You want to Delete This Request ?"
        />
      </div>
    </div>
  );
};

export default AdminUserRequest;
