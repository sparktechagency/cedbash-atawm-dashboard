import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserData from "../hooks/useUserData";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // ✅ add this
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const user = useUserData();
  const location = useLocation();

  // ✅ if user not logged in
  if (!user?.role) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // ✅ if role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/admin/overview" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
