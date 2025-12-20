import { Rate, Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { IFeedback } from "../../types";
import { AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";

interface AdminAllReviewTableProps {
  data: IFeedback[];
  loading: boolean;
  showViewModal: (record: IFeedback) => void;
  showDeleteModal: (record: IFeedback) => void;
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
  const serverUrl = getImageUrl();
  const columns = [
    {
      title: "#UID",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      key: "_id",
    },
    {
      title: "User Name",
      dataIndex: "ratee", // Data key for ratee
      key: "ratee",
      render: (text: string, record: IFeedback) => (
        <div className="flex items-center gap-3">
          <img
            src={
              (record?.rater?.profileImage?.length as number) > 0
                ? serverUrl + record?.rater?.profileImage
                : AllImages.profile
            }
            alt={text}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{record?.rater?.fullName}</span>
        </div>
      ),
    },

    {
      title: "User Email",
      dataIndex: ["rater", "email"], // Data key for email
      key: "email",
    },
    {
      title: "Vendor Name",
      dataIndex: "ratee", // Data key for ratee
      key: "ratee",
      render: (text: string, record: IFeedback) => (
        <div className="flex items-center gap-3">
          <img
            src={
              record?.ratee?.profileImage?.length > 0
                ? serverUrl + record?.ratee?.profileImage
                : AllImages.profile
            }
            alt={text}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{record?.ratee?.fullName}</span>
        </div>
      ),
    },
    {
      title: "Vendor Email",
      dataIndex: ["ratee", "email"], // Data key for email
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "createdAt", // Data key for createdAt
      key: "createdAt",
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
      dataIndex: "comment", // Data key for comment
      key: "comment",
      render: (text: string) => (
        <div className="max-w-[200px] truncate">
          {text.slice(0, 50) + (text.length > 50 ? "..." : "")}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IFeedback) => (
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
