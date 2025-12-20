//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import usersLogo from "/images/dashboard-logo/users.svg";
import categoriesLogo from "/images/dashboard-logo/categories.svg";
import earningLogo from "/images/dashboard-logo/earning.svg";
import withdrawLogo from "/images/dashboard-logo/withdraw.svg";
import badgeLogo from "/images/dashboard-logo/badge.svg";
import feedbackLogo from "/images/dashboard-logo/feedback.svg";
import refundLogo from "/images/dashboard-logo/refund.svg";
import adminLogo from "/images/dashboard-logo/admin.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Notifications from "../pages/Common/Notifications";
import AdminAllUsers from "../pages/Admin/AdminAllUsers";
import AdminAllEarning from "../pages/Admin/AdminAllEarning";
import AdminAllReview from "../pages/Admin/AdminAllReview";
import AdminAllRefund from "../pages/Admin/AdminAllRefund";
import AdminAllWithdraw from "../pages/Admin/AdminAllWithdraw";
import AdminAllBadge from "../pages/Admin/AdminAllBadge";
import AdminAllCategory from "../pages/Admin/AdminAllCategory";
import AdminAllVendor from "../pages/Admin/AdminAllVendor";
import AdminAllVendorRequest from "../pages/Admin/AdminAllVendorRequest";
import AdminAllAdmin from "../pages/Admin/AdmiAllAdmin";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminDashboard />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
  {
    path: "user",
    element: <AdminAllUsers />,
    key: "user",
    name: "Users",
    icon: usersLogo,
  },
  {
    key: "vendor",
    name: "Vendor",
    icon: usersLogo,
    children: [
      {
        key: "vendor-list",
        path: "vendor-list",
        element: <AdminAllVendor />,
        name: "Vendor List",
      },
      {
        key: "request-list",
        path: "settings/request-list",
        element: <AdminAllVendorRequest />,
        name: "Request List",
      },
    ],
  },
  {
    path: "category",
    element: <AdminAllCategory />,
    key: "category",
    name: "Categories",
    icon: categoriesLogo,
  },
  {
    path: "earning",
    element: <AdminAllEarning />,
    key: "earning",
    name: "Earning",
    icon: earningLogo,
  },
  {
    path: "withdraw",
    element: <AdminAllWithdraw />,
    key: "withdraw",
    name: "Withdraw",
    icon: withdrawLogo,
  },
  {
    path: "badge",
    element: <AdminAllBadge />,
    key: "badge",
    name: "Badge",
    icon: badgeLogo,
  },
  {
    path: "feedback",
    element: <AdminAllReview />,
    key: "feedback",
    name: "Feedback",
    icon: feedbackLogo,
  },
  {
    path: "refund",
    element: <AdminAllRefund />,
    key: "refund",
    name: "Refund",
    icon: refundLogo,
  },
  {
    path: "all-admin",
    element: <AdminAllAdmin />,
    key: "all-admin",
    name: "All Admin",
    icon: adminLogo,
  },
];
