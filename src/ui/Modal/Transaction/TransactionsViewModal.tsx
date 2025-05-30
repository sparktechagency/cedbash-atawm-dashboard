/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Modal } from "antd";

interface TransactionsViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}

const TransactionsViewModal: React.FC<TransactionsViewModalProps> = ({
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
          Transaction Details
        </h1>
      }
    >
      <div className="py-5">
        <div className="text-lg text-center font-medium ">
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Seller name :</div>
            <div>{currentRecord?.name}</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Transaction ID:</div>
            <div className="text-justify pt-0">TXN012301</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Date: </div>
            <div className="text-base-color">{currentRecord?.date}</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">A/C No: </div>
            <div className="text-base-color">**** **** **** 1234</div>
          </div>

          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">
              Transaction amount :
            </div>
            <div className="text-justify pt-0">{currentRecord?.amount}</div>
          </div>
          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Commission :</div>
            <div className="text-justify pt-0">{currentRecord?.commission}</div>
          </div>

          <div className="flex justify-start items-center gap-2 mb-2">
            <div className="font-bold text-base-color">Status:</div>
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

export default TransactionsViewModal;
