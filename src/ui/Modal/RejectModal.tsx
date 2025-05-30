/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../Button/ReuseButton";

interface RejectModalProps<T> {
  isRejectModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
  handleReject: (data: T | null) => void;
  description?: string;
}

const RejectModal: React.FC<RejectModalProps<any>> = ({
  isRejectModalVisible,
  handleCancel,
  currentRecord,
  handleReject,
  description = "Are you sure you want to reject this?",
}) => {
  return (
    <Modal
      open={isRejectModalVisible}
      onCancel={handleCancel}
      centered
      style={{ textAlign: "center" }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "40px",
            marginTop: "30px",
          }}
        >
          <ReuseButton
            variant="highlight"
            className="!px-6 !py-5 mr-4 w-fit flex items-center justify-center gap-2"
            onClick={handleCancel}
          >
            Cancel
          </ReuseButton>
          <ReuseButton
            variant="error"
            className="!px-6 !py-5 w-fit flex items-center justify-center gap-2"
            onClick={() => handleReject(currentRecord)}
          >
            Reject
          </ReuseButton>
        </div>
      }
    >
      <p className="text-3xl font-semibold pt-10 pb-4 text-base-color">
        {description}
      </p>
    </Modal>
  );
};

export default RejectModal;
