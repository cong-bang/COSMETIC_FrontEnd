import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 

const RequireAdmin = ({ children }) => {
  const user = useSelector((state) => state.auth?.user);

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
