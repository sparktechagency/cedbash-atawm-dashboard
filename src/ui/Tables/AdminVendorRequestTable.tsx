/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { ColumnsType } from "antd/es/table";
import { formatDate } from "../../utils/dateFormet";

interface AdminVendorRequestTableProps {
  data: any[];
  loading: boolean;
  setPage?: (page: number) => void;
  showViewModal: (record: any) => void;
  page: number;
  total: number;
  limit: number;
}

const AdminVendorRequestTable: React.FC<AdminVendorRequestTableProps> = ({
  data,
  loading,
  setPage,
  showViewModal,
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
      title: "Request Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => formatDate(text),
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

export default AdminVendorRequestTable;
