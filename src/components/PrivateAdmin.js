import React from "react";
import { useFirebase } from "../FirebaseContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateAdmin = () => {
  const { user, loading } = useFirebase();

  if (loading) {
    return <p>Wait</p>;
  }
  return user ? user.uid == "8oDPt7dMNVeYUUb4L9aHRu8c5uL2" ? <Outlet /> : <Navigate to="/" /> : <Navigate to="/login" />;
};

export default PrivateAdmin;
