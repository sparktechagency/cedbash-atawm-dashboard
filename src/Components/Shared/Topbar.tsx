/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarsOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { AllIcons } from "../../../public/images/AllImages";
import useUserData from "../../hooks/useUserData";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import { formatDateTime } from "../../utils/dateFormet";
import { useState } from "react";
import { useGetNotificationQuery } from "../../redux/features/overview/overviewApi";
import SpinLoader from "../../ui/SpinLoader";

// Define the type for a notification

// Define the types for the component props
interface TopbarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({ collapsed, setCollapsed }) => {
  const serverUrl = getImageUrl();
  const [open, setOpen] = useState(false);

  const user = useUserData();
  const { data, isFetching } = useGetProfileQuery({});

  const profileData = data?.data;

  const profileImage = serverUrl + profileData?.profileImage;

  const { data: notification, isFetching: notificationFetching } =
    useGetNotificationQuery(
      {
        page: 1,
        limit: 5,
      },
      {
        skip: !open,
        refetchOnMountOrArgChange: open,
      }
    );
  console.log(notification);
  const notificationData = notification?.data?.notifications;

  const handleMenuClick = () => {
    setCollapsed(false);
  };

  const notificationMenu = (
    <div
      className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
      style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.25)" }}
      onClick={handleMenuClick}
    >
      {notificationFetching ? (
        <div className="px-10 py-4">
          <SpinLoader />
        </div>
      ) : (
        notificationData?.map((notification: any) => (
          <div className="test-start" key={notification.id}>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-[#BFD9FD] rounded-full w-fit h-fit">
                <img src={AllIcons.bell} className="w-5 h-5" alt="" />
              </div>
              <div className="flex flex-col items-start">
                <p>{notification?.message?.text}</p>
                <p className="text-gray-400">
                  {formatDateTime(notification?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
      <Link
        to={`/${user?.role}/notifications`}
        className="w-2/3 mx-auto !bg-secondary-color !text-primary-color rounded-xl h-8 py-1"
      >
        See More
      </Link>
    </div>
  );

  return (
    <div className="flex justify-between gap-0 items-center mt-1.5">
      <div className="flex items-center gap-2 text-base-color ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-primary-color"
        />
      </div>
      <div className="flex items-center justify-center gap-5">
        <Dropdown
          overlay={notificationMenu}
          trigger={["hover"]}
          onOpenChange={(open: boolean) => {
            setOpen(open);
          }}
          placement="bottomRight"
          className="cursor-pointer"
        >
          <div className=" p-1 bg-[#BFD9FD] rounded-full w-fit">
            <img src={AllIcons.bell} className="w-6 h-6" alt="" />
          </div>
        </Dropdown>
        {isFetching ? (
          <div className="px-10 py-4">
            <SpinLoader />
          </div>
        ) : (
          <Link to="profile">
            <div className="flex items-center justify-center gap-0 bg-[#f7f8fa] text-base-color rounded-lg  px-2 py-1 ">
              <img
                src={profileImage}
                alt="profile_pic"
                style={{ width: "40px", height: "40px", marginRight: "10px" }}
                className="rounded-full border border-secondary-color"
              />
              <div className="flex flex-col justify-center">
                <p className="text-base-color font-semibold text-sm">
                  {profileData?.fullName}
                </p>
                <p className="text-base-color text-xs">Admin</p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
