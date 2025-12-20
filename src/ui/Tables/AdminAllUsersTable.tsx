import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { ColumnsType } from "antd/es/table";
import { AllImages } from "../../../public/images/AllImages";
import { IUser } from "../../types";
import { getImageUrl } from "../../helpers/config/envConfig";
import { formatDate } from "../../utils/dateFormet";
import { CgUnblock } from "react-icons/cg";

interface AdminAllUsersTableProps {
  data: IUser[];
  loading: boolean;
  setPage?: (page: number) => void;
  showViewModal: (record: IUser) => void;
  showBlockModal: (record: IUser) => void;
  showUnblockModal: (record: IUser) => void;
  page: number;
  total: number;
  limit: number;
}

const AdminAllUsersTable: React.FC<AdminAllUsersTableProps> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  page,
  total,
  limit,
}) => {
  const serverUrl = getImageUrl();
  const columns: ColumnsType<IUser> = [
    {
      title: "#UID",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      key: "_id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string, record: IUser) => (
        <div className="flex items-center gap-3">
          <img
            src={
              record?.profileImage?.length > 0
                ? serverUrl + record?.profileImage
                : AllImages.profile
            }
            alt={text}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{record?.fullName}</span>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => formatDate(val),
    },

    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: IUser) => (
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
            {/* Block User Tooltip */}
            {record?.isBlocked ? (
              <Tooltip placement="left" title="Unblock this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                  onClick={() => showUnblockModal(record)}
                >
                  <CgUnblock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            ) : (
              <Tooltip placement="left" title="Block this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                  onClick={() => showBlockModal(record)}
                >
                  <MdBlock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            )}
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
      keyValue={"_id"}
    />
  );
};

export default AdminAllUsersTable;
