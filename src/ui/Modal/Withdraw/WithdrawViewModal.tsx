/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd";

interface WithdrawViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
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
            <div>{currentRecord?.name}</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Transaction ID:</div>
            <div className="text-justify pt-0">TXN012301</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Date: </div>
            <div className="text-base-color">2025-12-12</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">A/C No: </div>
            <div className="text-base-color">**** **** **** 1234</div>
          </div>

          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Balance :</div>
            <div className="text-justify pt-0">$500</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Amount :</div>
            <div className="text-justify pt-0">$200</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Commission :</div>
            <div className="text-justify pt-0">$40</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Payment Method: :</div>
            <div className="text-justify pt-0">Card</div>
          </div>

          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Payment Status::</div>
            <div className="text-justify pt-0">
              {currentRecord?.Status === "Pending" ? (
                <span className="text-error-color">
                  {currentRecord?.Status}
                </span>
              ) : (
                <span className="text-success-color">Completed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawViewModal;
