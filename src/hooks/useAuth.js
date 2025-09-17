"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, token, signup, login, logout } = context;
  return { user, token, signup, login, logout };
};

export default useAuth;
