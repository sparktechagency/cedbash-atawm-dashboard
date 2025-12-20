/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd";
import { ITransaction } from "../../../types";
import { formatDate } from "../../../utils/dateFormet";

interface WithdrawViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ITransaction | null;
}

const WithdrawViewModal: React.FC<WithdrawViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
      title={
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color">
          Withdraw Details
        </h1>
      }
    >
      <div className="py-5">
        <div className="text-lg text-center font-medium ">
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Vendor name :</div>
            <div>{currentRecord?.vendorId?.fullName}</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Vendor Email :</div>
            <div>{currentRecord?.vendorId?.email}</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Date: </div>
            <div className="text-base-color">
              {formatDate(currentRecord?.createdAt)}
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Amount :</div>
            <div className="text-justify pt-0">${currentRecord?.amount}</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Payment Method: :</div>
            <div className="text-justify pt-0 capitalize">
              {currentRecord?.paymentMethod}
            </div>
          </div>

          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Payment Status::</div>
            <div className="text-justify pt-0">
              <span className="text-base-color bg-warning-color/10 px-2 py-1 rounded">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawViewModal;
