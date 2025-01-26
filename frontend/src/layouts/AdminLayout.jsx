import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Admin/AdminHeader";
import AdminSidebar from "../components/Admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-4 bg-gray-100 h-full overflow-y-auto">
          {/* Render nested routes here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
