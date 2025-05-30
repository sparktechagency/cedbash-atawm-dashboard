import { Rate, Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { ReviewType } from "../../types/ReviewType";

interface AdminAllReviewTableProps {
  data: ReviewType[];
  loading: boolean;
  showViewModal: (record: ReviewType) => void;
  showDeleteModal: (record: ReviewType) => void;
  setPage: (page: number) => void;
  page: number;
  total: number;
  limit: number;
}

// Explicitly define AdminAllReviewTable as a functional component
const AdminAllReviewTable: React.FC<AdminAllReviewTableProps> = ({
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
      title: "#UID",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    {
      title: "User Name",
      dataIndex: "fullName", // Data key for fullName
      key: "fullName",
    },

    {
      title: "User Email",
      dataIndex: "email", // Data key for email
      key: "email",
    },
    {
      title: "Vendor Name",
      dataIndex: "fullName", // Data key for fullName
      key: "fullName",
    },
    {
      title: "Vendor Email",
      dataIndex: "email", // Data key for email
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "date", // Data key for date
      key: "date",
    },
    {
      title: "Rating",
      dataIndex: "rating", // Data key for rating
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center">
          <Rate
            allowHalf
            value={rating}
            className="!text-secondary-color"
            disabled
          />
          <span className="ml-2">{rating}</span>
        </div>
      ),
    },
    {
      title: "Review",
      dataIndex: "review", // Data key for review
      key: "review",
      render: (text: string) => (
        <div className="max-w-[200px] truncate">{text.slice(0, 100)}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ReviewType) => (
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

export default AdminAllReviewTable;
