import {
  createBrowserRouter,
  RouteObject,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import Loading from "../ui/Loading";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.route";
import ProtectedRoute from "./ProtectedRoute";

// Auth
import SignIn from "../pages/Auth/SignIn";
import ForgotPassword from "../pages/Auth/ForgetPassword";
import OtpPage from "../pages/Auth/OtpPage";
import UpdatePassword from "../pages/Auth/UpdatePassword";

import NotFound from "../ui/NotFound/NotFound";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import { adminCommonPaths } from "./admin.common.route";
import useUserData from "../hooks/useUserData";

// eslint-disable-next-line react-refresh/only-export-components
function AuthRedirect() {
  const user = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role) {
      navigate(`/admin/overview`, { replace: true });
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, user]);

  return <Loading />;
}

// ✅ Remove "all-admin" from adminPaths when generating general routes
const adminPathsWithoutAllAdmin = adminPaths.filter(
  (item) => item.key !== "all-admin"
);

const router: RouteObject[] = [
  {
    path: "/",
    index: true,
    element: <AuthRedirect />,
  },
  {
    path: "/dashboard",
    index: true,
    element: <AuthRedirect />,
  },
  {
    path: "/admin",
    index: true,
    element: <AuthRedirect />,
  },

  // ✅ Single admin layout route
  {
    path: "admin",
    element: (
      <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      ...routeGenerator(adminPathsWithoutAllAdmin), // ✅ normal pages
      ...routeGenerator(adminCommonPaths), // ✅ common pages

      // ✅ ONLY super_admin can access this page
      {
        path: "all-admin",
        element: (
          <ProtectedRoute allowedRoles={["super_admin"]}>
            {/* This component must match your route file */}
            {/* adminPaths has element: <AdminAllAdmin /> */}
            {adminPaths.find((p) => p.key === "all-admin")?.element ?? (
              <NotFound />
            )}
          </ProtectedRoute>
        ),
      },
    ],
  },

  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "forgot-password/otp-verify",
    element: <OtpPage />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const routes = createBrowserRouter(router);
export default routes;
