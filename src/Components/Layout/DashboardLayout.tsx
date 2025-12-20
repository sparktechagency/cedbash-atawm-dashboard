import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import logout from "/images/dashboard-logo/logout.svg";
import getActiveKeys from "../../utils/activeKey";
import { adminPaths } from "../../Routes/admin.route";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import Topbar from "../Shared/Topbar";
import { AllImages } from "../../../public/images/AllImages";
import { adminCommonPaths } from "../../Routes/admin.common.route";
import useUserData from "../../hooks/useUserData";
import Cookies from "js-cookie";

const DashboardLayout = () => {
  const userRole = useUserData();
  const location = useLocation();

  const defaultUrl = "/admin";

  const normalizedPath = location.pathname.replace(defaultUrl, "");

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    Cookies.remove("atawn_dashboard_accessToken");
    Cookies.remove("atawn_dashboard_refreshToken");
    window.location.href = "/sign-in";
    window.location.reload();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activeKeys = getActiveKeys(normalizedPath);
  // ✅ role
  const role = userRole?.role;

  // ✅ filter paths for admin (remove All Admin)
  const filteredAdminPaths =
    role === "admin"
      ? adminPaths.filter((item) => item.key !== "all-admin")
      : adminPaths;

  const menuItems =
    role === "super_admin" || role === "admin"
      ? sidebarItemsGenerator(filteredAdminPaths, "admin") // pass real role
      : [];

  const otherItems =
    role === "super_admin" || role === "admin"
      ? sidebarItemsGenerator(adminCommonPaths, "admin")
      : [];

  otherItems.push({
    key: "logout",
    icon: (
      <img
        src={logout}
        alt="logout"
        width={16}
        height={16}
        style={{ color: "#222222", fontSize: "16px", marginRight: "5px" }}
      />
    ),
    label: (
      <div onClick={handleLogout}>
        <NavLink to="/sign-in">Logout</NavLink>
      </div>
    ),
  });

  return (
    <div className="h-screen bg-background-color ">
      <ScrollRestoration />

      <Layout className="flex !bg-background-color">
        <Sider
          theme="light"
          width={300}
          trigger={null}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "#ffffff",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              className="w-[70%] mx-auto h-auto mt-5 mb-10"
            />
          </Link>
          <Typography.Title
            className="mb-1 !text-[#A7A9AA]"
            level={5}
            style={{
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
            }}
          >
            Menu
          </Typography.Title>
          <Menu
            mode="inline"
            defaultSelectedKeys={activeKeys}
            selectedKeys={activeKeys}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />

          <Typography.Title
            className="mb-1 !text-[#A7A9AA]"
            level={5}
            style={{
              paddingLeft: "6px",
              paddingRight: "6px",
              marginLeft: "12%",
              marginTop: "30px",
            }}
          >
            Others
          </Typography.Title>
          <Menu
            mode="inline"
            defaultSelectedKeys={activeKeys}
            selectedKeys={activeKeys}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={otherItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#ffffff",
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 0,
            }}
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content>
            <div className="bg-background-color px-2 xl:px-5 py-4 xl:py-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
