"use client";

import React, { useEffect } from "react";

import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import LiveQuizzes from "@/app/components/Admin/quiz/LiveQuizzes";

const Page = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <AdminProtected>

      <Heading
        title="Live Quizzes - Admin"
        description="All Live Quizzes"
        keywords="Quizzes"
      />

      <div className="flex min-h-screen bg-white dark:bg-[#0f172a]">

        {/* SIDEBAR */}
        <div className="hidden 800px:block w-[18%] fixed left-0 top-0 h-full">
          <AdminSidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="w-full 800px:ml-[18%] overflow-y-auto">
          <DashboardHero />

          <div className="p-5">
            <LiveQuizzes />
          </div>
        </div>

      </div>
    </AdminProtected>
  );
};

export default Page;