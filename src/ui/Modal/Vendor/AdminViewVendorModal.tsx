import { Modal, Rate } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import ReuseButton from "../../Button/ReuseButton";
import { IVendorUser } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { formatDate } from "../../../utils/dateFormet";
interface AdminViewVendorModalProps {
  isUserViewModalVisible: boolean;
  handleCancel: () => void;
  showBadgeModal: (data: IVendorUser) => void;
  currentRecord: IVendorUser | null;
}
const AdminViewVendorModal: React.FC<AdminViewVendorModalProps> = ({
  isUserViewModalVisible,
  handleCancel,
  showBadgeModal,
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
            Vendor Details
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
              {/* <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Shop Name: </span>
                <span className="">Daraz</span>
              </div> */}
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Phone Number:</span>
                <span>{currentRecord?.phone}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Address:</span>
                <span>{currentRecord?.address}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Joining Date:</span>
                <span>{formatDate(currentRecord?.createdAt)} </span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">AVG Rating:</span>
                <div>
                  <Rate
                    allowHalf
                    className="!text-secondary-color"
                    disabled
                    value={currentRecord?.averageRating}
                  />
                  <span className="ml-2">{currentRecord?.averageRating}</span>
                  <span>({currentRecord?.totalRatings})</span>
                </div>
              </div>
            </div>
          </div>
          <ReuseButton
            variant="secondary"
            className="mt-5"
            onClick={() => showBadgeModal(currentRecord as IVendorUser)}
          >
            Badges
          </ReuseButton>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewVendorModal;
