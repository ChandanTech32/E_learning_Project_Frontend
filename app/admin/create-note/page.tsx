"use client";

import React from "react";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import CreateNote from "../../components/Admin/Notes/CreateNote";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Create Note - Admin"
          description="Create Notes"
          keywords="Notes"
        />

        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>

          <div className="w-[85%]">
            <DashboardHero />
            <CreateNote />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;