import React from "react";
import { useFirebase } from "../FirebaseContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateAdmin = () => {
  const { user, loading } = useFirebase();

  if (loading) {
    return <p>Wait</p>;
  }
  return user ? user.uid == "5UmtlWxV1PRxnrw49ZObFa3STT23" ? <Outlet /> : <Navigate to="/" /> : <Navigate to="/login" />;
};

export default PrivateAdmin;
