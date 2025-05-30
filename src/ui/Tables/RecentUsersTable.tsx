import React from "react";
import ReuseTable from "../../utils/ReuseTable";
import { IUser } from "../../types/userTypes";
import { ConfigProvider } from "antd";
import { ColumnsType } from "antd/es/table";
import { AllImages } from "../../../public/images/AllImages";

interface RecentUsersTableProps {
  data: IUser[];
  loading: boolean;
  setPage?: (page: number) => void;
  page?: number;
  total?: number;
  limit?: number;
}

const RecentUsersTable: React.FC<RecentUsersTableProps> = ({
  data,
  loading,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns: ColumnsType<IUser> = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string, record: IUser) => (
        <div className="flex items-center gap-3">
          <img
            src={AllImages.profile}
            alt={text}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>{record.fullName}</span>
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
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "User", value: "User" },
        { text: "Admin", value: "Admin" },
      ],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            colorTextQuaternary: "#ffffff",
            colorIcon: "#ffffff",
            headerBg: "#FF9815",
            colorBgContainer: "#ffffff",
            colorText: "#111111",
            borderColor: "#ffffff",
            headerColor: "#ffffff",
            fontSize: 18,
            footerColor: "#FDFDFD",
            // marginXXS: 4,
            colorLinkActive: "#FDFDFD",
            headerSplitColor: "#ffffff",
          },
        },
      }}
    >
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
    </ConfigProvider>
  );
};

export default RecentUsersTable;
