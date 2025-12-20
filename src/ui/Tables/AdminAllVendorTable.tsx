/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Rate, Space, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { ColumnsType } from "antd/es/table";
import { formatDate } from "../../utils/dateFormet";
import { IVendorUser } from "../../types";
import { CgUnblock } from "react-icons/cg";

interface AdminAllVendorTableProps {
  data: any[];
  loading: boolean;
  setPage?: (page: number) => void;
  showViewModal: (record: any) => void;
  showBlockModal: (record: any) => void;
  showUnblockModal: (record: any) => void;
  page: number;
  total: number;
  limit: number;
}

const AdminAllVendorTable: React.FC<AdminAllVendorTableProps> = ({
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
  const columns: ColumnsType<any> = [
    {
      title: "#UID",
      dataIndex: "_id",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
      key: "_id",
    },
    {
      title: "Vendor Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val) => formatDate(val),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (_: unknown, record: IVendorUser) => (
        <div>
          <Rate
            allowHalf
            className="!text-secondary-color"
            disabled
            value={record?.averageRating}
          />
          <span className="ml-2">{record?.averageRating}</span>
          <span>({record?.totalRatings})</span>
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
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
            {!record?.isBlocked ? (
              <Tooltip placement="left" title="Block this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                  onClick={() => showBlockModal(record)}
                >
                  <MdBlock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            ) : (
              <Tooltip placement="left" title="Unblock this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                  onClick={() => showUnblockModal(record)}
                >
                  <CgUnblock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            )}
            {/* Block User Tooltip */}

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

export default AdminAllVendorTable;
