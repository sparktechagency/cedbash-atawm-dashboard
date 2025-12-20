import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { IUser } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { formatDate } from "../../../utils/dateFormet";
interface AdminViewUsersModalProps {
  isUserViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IUser | null;
}
const AdminViewUsersModal: React.FC<AdminViewUsersModalProps> = ({
  isUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const serverUrl = getImageUrl();
  return (
    <Modal
      open={isUserViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-color text-center">
            User Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.fullName}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={
                (currentRecord?.profileImage?.length as number) > 0
                  ? serverUrl + currentRecord?.profileImage
                  : AllImages.profile
              }
              alt={currentRecord?.fullName}
              className="w-16 h-16 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.fullName}
            </h2>
          </div>

          <div className="mt-5">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              Personal Information
            </h2>
            <div className="text-lg  mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Name: </span>
                <span className="">{currentRecord?.fullName}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Gender:</span>
                <span>Male</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Phone:</span>
                <span>{currentRecord?.phone}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Address:</span>
                <span>{currentRecord?.address}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Date of Birth:</span>
                <span>{formatDate(currentRecord?.dob as string)}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Joining Date:</span>
                <span>{formatDate(currentRecord?.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewUsersModal;
