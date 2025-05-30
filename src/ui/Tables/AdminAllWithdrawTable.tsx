/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { ColumnsType } from "antd/es/table";

interface AdminAllWithdrawTableProps {
  data: any[];
  loading: boolean;
  setPage?: (page: number) => void;
  showViewModal: (record: any) => void;
  showRejectModal: (record: any) => void;
  showAcceptModal: (record: any) => void;
  page?: number;
  total?: number;
  limit?: number;
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
  const columns: ColumnsType<any> = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },

    {
      title: "Processing Fee",
      dataIndex: "processingFee",
      key: "processingFee",
      render: () => `20%`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className="!capitalize !text-base"
          color={statusColors[status]}
          style={{ textTransform: "capitalize" }}
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Processing", value: "processing" },
        { text: "Completed", value: "completed" },
        { text: "Failed", value: "failed" },
      ],
      onFilter: (value, record) => record.status === value,
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
