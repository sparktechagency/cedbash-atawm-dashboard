/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { Rate, Space, Tag, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { ColumnsType } from "antd/es/table";

interface AdminAllVendorTableProps {
  data: any[];
  loading: boolean;
  setPage?: (page: number) => void;
  showViewModal: (record: any) => void;
  showBlockModal: (record: any) => void;
  showUnblockModal: (record: any) => void;
  page?: number;
  total?: number;
  limit?: number;
}

const statusColors: Record<string, string> = {
  active: "green",
  deactive: "red",
};

const AdminAllVendorTable: React.FC<AdminAllVendorTableProps> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showBlockModal,
  // showUnblockModal,
  page,
  total,
  limit,
}) => {
  const columns: ColumnsType<any> = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className="!text-base"
          color={statusColors[status]}
          style={{ textTransform: "capitalize" }}
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (val) => (
        <div>
          <Rate
            allowHalf
            className="!text-secondary-color"
            disabled
            defaultValue={val}
          />
          <span className="ml-2">{val}</span>
          <span>(5)</span>
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
            {/* Block User Tooltip */}
            {/* <Tooltip placement="left" title="Unblock this User">
                <button
                  className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                  onClick={() => showUnblockModal(record)}
                >
                  <CgUnblock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip> */}

            <Tooltip placement="left" title="Block this User">
              <button
                className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                onClick={() => showBlockModal(record)}
              >
                <MdBlock style={{ fontSize: "24px" }} />
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

export default AdminAllVendorTable;
