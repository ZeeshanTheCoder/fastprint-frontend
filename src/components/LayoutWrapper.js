"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";

const LayoutWrapper = ({ children }) => {
  const context = useContext(AuthContext);
  const pathname = usePathname();

  const authRoutes = ["/login", "/signup"];

  // Skip layout for login/signup
  if (authRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  // Extract user from context
  const { user } = context || {};

  // Wait until context is loaded
  if (!context) {
    return <div>Loading...</div>;
  }

  // If user is admin, show ONLY AdminHeader (not Header)
  if (user && user.is_admin) {
    return (
      <>
        <AdminHeader />
        <main>{children}</main>
        <Footer />
      </>
    );
  }

  // For all other logged-in or public users (non-admin), show default layout
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
