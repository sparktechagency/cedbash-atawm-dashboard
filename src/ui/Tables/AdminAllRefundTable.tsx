/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { ColumnsType } from "antd/es/table";
import { formatDate } from "../../utils/dateFormet";

interface AdminAllRefundTableProps {
  data: any[];
  loading: boolean;
  showViewModal: (record: any) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

// Explicitly define AdminAllRefundTable as a functional component
const AdminAllRefundTable: React.FC<AdminAllRefundTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const statusColors: Record<string, string> = {
    pending: "orange",
    accept: "green",
    reject: "red",
  };
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
      dataIndex: ["userId", "fullName"],
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: ["userId", "email"],
      key: "email",
    },
    {
      title: "Price",
      dataIndex: "refundedAmount",
      key: "refundedAmount",
      render: (val) => `$${val.toFixed(2)}`,
    },
    {
      title: "Role",
      dataIndex: "refundedBy",
      key: "refundedBy",
    },
    {
      title: "Reason",
      dataIndex: "refundReason",
      key: "refundReason",
      ellipsis: true,
    },
    {
      title: "Request Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => formatDate(val),
    },
    {
      title: "Status",
      dataIndex: "refundStatus",
      key: "refundStatus",
      render: (status) => (
        <Tag
          className="!text-base"
          color={statusColors[status]}
          style={{ textTransform: "capitalize" }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
        </Space>
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

export default AdminAllRefundTable;
