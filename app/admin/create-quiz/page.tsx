"use client";

import React, { useEffect } from "react";

import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import CreateQuiz from "../../components/Admin/quiz/CreateQuiz";

type Props = {};

const Page = (props: Props) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <AdminProtected>
        <Heading
          title="Create Quiz - Admin"
          description="Create Quiz"
          keywords="Quiz"
        />

        <div className="flex h-screen">
          {/* SIDEBAR */}
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>

          {/* CONTENT */}
          <div className="w-[85%] h-screen overflow-y-auto">
            <DashboardHero />
            <CreateQuiz />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;