/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { formatDate } from "../../utils/dateFormet";

interface TransactionsTableProps {
  data: any[];
  loading: boolean;
  showViewModal: (record: any) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: ["paymentId", "paymentInfo", "stripePaymentIntentId"],
      key: "id",
    },
    {
      title: "User",
      dataIndex: ["userId", "fullName"],
      key: "userId",
    },
    {
      title: "Vendor",
      dataIndex: ["vendorId", "fullName"],
      key: "vendorId",
    },
    {
      title: "Amount",
      dataIndex: "serviceAmount",
      key: "serviceAmount",
      render: (val: number) => `$${val.toFixed(2)}`,
    },
    {
      title: "Commission",
      dataIndex: "adminAmount",
      key: "adminAmount",
      render: (val: number) => `$${val.toFixed(2)}`,
    },
    {
      title: "Vendor Amount",
      dataIndex: "vendorAmount",
      key: "vendorAmount",
      render: (val: number) => `$${val.toFixed(2)}`,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val: string) => formatDate(val),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
              type="button"
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
      ),
      responsive: ["md"],
      align: "center" as const,
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
      keyValue={"_id"}
    />
  );
};

export default TransactionsTable;
