/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdArrowBackIos } from "react-icons/md";
import { AllIcons } from "../../../public/images/AllImages";
import { useGetNotificationQuery } from "../../redux/features/overview/overviewApi";
import Loading from "../../ui/Loading";
import { formatDateTime } from "../../utils/dateFormet";
import { Pagination } from "antd";
import { useState } from "react";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: notification, isFetching: notificationFetching } =
    useGetNotificationQuery(
      {
        page: page,
        limit,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );
  console.log(notification);
  const notificationData = notification?.data?.notification;
  const total = notification?.data?.meta?.total || [];

  if (notificationFetching) {
    return <Loading />;
  }

  return (
    <div
      className=" bg-slate-50  rounded-xl min-h-[85vh] pb-8"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center bg-secondary-color gap-1 py-3 px-5 mb-3 rounded-tl-xl rounded-tr-xl">
        <MdArrowBackIos
          className="text-xl sm:text-2xl lg:text-3xl text-primary-color cursor-pointer"
          onClick={() => window.history.back()}
        />

        <h1 className="text-3xl font-bold text-primary-color">
          All Notifications
        </h1>
      </div>
      <div className=" flex flex-col justify-between min-h-[78vh] ">
        <div className="px-4 sm:px-6 md:px-8 space-y-4 pb-6">
          {notificationData?.map((notification: any) => (
            <div
              className="test-start bg-secondary-color/10 p-4 rounded-xl"
              key={notification.id}
            >
              <div className="flex items-start gap-2">
                <div className="p-1 bg-[#BFD9FD] rounded-full w-fit h-fit mt-1">
                  <img src={AllIcons.bell} className="w-5 h-5" alt="" />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-lg font-semibold">{notification?.title}</p>
                  <p className="text-gray-400">{notification?.message}</p>
                  <p className="text-gray-400 text-xs">
                    {formatDateTime(notification?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          current={page}
          total={total}
          pageSize={limit}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};
export default Notifications;
