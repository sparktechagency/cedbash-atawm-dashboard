/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Rate } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import ReuseButton from "../../Button/ReuseButton";
interface AdminVendorRequestModalProps {
  isUserViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}
const AdminVendorRequestModal: React.FC<AdminVendorRequestModalProps> = ({
  isUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
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
            Vendor Request Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.vendorName}
          </p>
          <div className="flex justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.profile}
              alt={currentRecord?.vendorName}
              className="w-16 h-16 object-cover rounded"
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              {currentRecord?.vendorName}
            </h2>
          </div>

          <div className="mt-5">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ">
              Personal Information
            </h2>
            <div className="text-lg  mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Name: </span>
                <span className="">{currentRecord?.vendorName}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Shop Name: </span>
                <span className="">Daraz</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Phone Number:</span>
                <span>+880123456789</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Address:</span>
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Joining Date:</span>
                <span>{currentRecord?.joiningDate} </span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">AVG Rating:</span>
                <div>
                  <Rate
                    allowHalf
                    className="!text-secondary-color"
                    disabled
                    defaultValue={currentRecord?.rating}
                  />
                  <span className="ml-2">{currentRecord?.rating}</span>
                  <span>(5)</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <ReuseButton variant="secondary" className="mt-5">
              Reject
            </ReuseButton>
            <ReuseButton variant="secondary" className="mt-5">
              Approve
            </ReuseButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminVendorRequestModal;
