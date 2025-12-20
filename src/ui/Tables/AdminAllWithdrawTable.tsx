/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { ColumnsType } from "antd/es/table";
import { getImageUrl } from "../../helpers/config/envConfig";
import { AllImages } from "../../../public/images/AllImages";
import { ITransaction } from "../../types";

interface AdminAllWithdrawTableProps {
  data: any[];
  loading: boolean;
  setPage?: (page: number) => void;
  showViewModal: (record: any) => void;
  showRejectModal: (record: any) => void;
  showAcceptModal: (record: any) => void;
  page: number;
  total: number;
  limit: number;
}

const statusColors: Record<string, string> = {
  pending: "orange",
  processing: "blue",
  completed: "green",
  failed: "red",
};

const AdminAllWithdrawTable: React.FC<AdminAllWithdrawTableProps> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showRejectModal,
  showAcceptModal,
  page,
  total,
  limit,
}) => {
  const serverUrl = getImageUrl();
  const columns: ColumnsType<any> = [
    {
      title: "#UID",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: ["vendorId", "fullName"],
      key: "vendorId",
      render: (text: string, record: ITransaction) => (
        <div className="flex items-center gap-3">
          <img
            src={
              record?.vendorId?.profileImage?.length > 0
                ? serverUrl + record?.vendorId?.profileImage
                : AllImages.profile
            }
            alt={text}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{record?.vendorId?.fullName}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: ["vendorId", "email"],
      key: "email",
    },
    {
      title: "Role",
      dataIndex: ["vendorId", "role"],
      key: "role",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Status",
      dataIndex: "forWithdrawStatus",
      key: "forWithdrawStatus",
      render: (status) => (
        <Tag
          className="!capitalize !text-base"
          color={statusColors[status]}
          style={{ textTransform: "capitalize" }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Payment Information",
      key: "paymentInfo",
      render: (_: unknown, record: any) => (
        <>
          <Space size="middle">
            <Tooltip placement="right" title="View Details">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
                onClick={() => showViewModal(record)}
              >
                <GoEye style={{ fontSize: "24px" }} />
              </button>
            </Tooltip>
          </Space>
        </>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <>
          <Space size="middle">
            {/* Block User Tooltip */}
            <Tooltip placement="left" title="Accept">
              <button
                className="!py-1 !px-2 rounded !text-white !text-sm !bg-green-500 !border-none  cursor-pointer"
                onClick={() => showAcceptModal(record)}
              >
                Accept{" "}
              </button>
            </Tooltip>

            <Tooltip placement="left" title="Reject">
              <button
                className="!py-1 !px-2 rounded !text-white !text-sm !bg-red-500 !border-none  cursor-pointer"
                onClick={() => showRejectModal(record)}
              >
                Reject
              </button>
            </Tooltip>
            {/* View Details Tooltip */}
          </Space>
        </>
      ),

      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"email"}
    />
  );
};

export default AdminAllWithdrawTable;
