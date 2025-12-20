/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import ReuseButton from "../../Button/ReuseButton";
import { IVendorUser } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { formatDate } from "../../../utils/dateFormet";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import {
  useAcceptVendorMutation,
  useRejectVendorMutation,
} from "../../../redux/features/vendor/vendorApi";
interface AdminVendorRequestModalProps {
  isUserViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IVendorUser | null;
}
const AdminVendorRequestModal: React.FC<AdminVendorRequestModalProps> = ({
  isUserViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const serverUrl = getImageUrl();
  const [acceptVendor] = useAcceptVendorMutation();
  const [rejectVendor] = useRejectVendorMutation();
  const handleAccept = async (data: IVendorUser) => {
    const res = await tryCatchWrapper(
      acceptVendor,
      {
        params: data?._id,
      },
      "Blocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleReject = async (data: IVendorUser) => {
    const res = await tryCatchWrapper(
      rejectVendor,
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
            See all details about {currentRecord?.fullName}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={
                currentRecord?.profileImage
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
                <span className="font-medium">Joining Date:</span>
                <span>{formatDate(currentRecord?.createdAt)} </span>
              </div>
              <div className="space-y-2">
                <span className="font-medium mb-3">Document:</span>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {currentRecord?.nidDocuments?.map((doc: any) => (
                    <Image
                      src={serverUrl + doc}
                      alt={doc.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-2">
            <ReuseButton
              onClick={() => handleReject(currentRecord!)}
              variant="secondary"
              className="mt-5"
            >
              Reject
            </ReuseButton>
            <ReuseButton
              onClick={() => handleAccept(currentRecord!)}
              variant="secondary"
              className="mt-5 !bg-success-color !border-success-color"
            >
              Approve
            </ReuseButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminVendorRequestModal;
