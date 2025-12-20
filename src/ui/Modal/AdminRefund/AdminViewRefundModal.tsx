import { Modal } from "antd";
import { IRefund } from "../../../types";
import ReuseButton from "../../Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAcceptRefundMutation } from "../../../redux/features/refund/refundApi";

interface AdminViewRefundModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IRefund | null;
}

const AdminViewRefundModal: React.FC<AdminViewRefundModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [approveRefund] = useAcceptRefundMutation();

  const handleApprove = async (data: IRefund) => {
    const res = await tryCatchWrapper(
      approveRefund,
      {
        params: data?._id,
      },
      "Approving Refund..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[450px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-color text-center">
            Cancelled Order
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2">
            {currentRecord?.userId?.fullName} want refund for the order
          </p>

          <div className="mt-5">
            <div className="text-lg  ">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">User Name: </span>
                <span className="text-secondary-color">
                  {currentRecord?.userId?.fullName}
                </span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">User Email:</span>
                <span>{currentRecord?.userId?.email}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">Vendor Name: </span>
                <span className="">{currentRecord?.vendorId?.fullName}</span>
              </div>

              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Vendor Email:</span>
                <span>{currentRecord?.vendorId?.email}</span>
              </div>
              <div className="flex items-center  gap-2 mb-2">
                <span className="font-medium">Refunded Amount:</span>
                <span>{currentRecord?.refundedAmount}</span>
              </div>

              <div className="flex items-start  gap-2 mb-2">
                <span className="font-medium text-nowrap">Reason :</span>
                <span className="text-justify pt-0 ">
                  {currentRecord?.refundReason}
                </span>
              </div>
            </div>
          </div>
          <div>
            <ReuseButton
              variant="secondary"
              onClick={() => handleApprove(currentRecord as IRefund)}
            >
              Approve
            </ReuseButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AdminViewRefundModal;
