"use client";

import React, { FC, useState } from "react";

import Heading from "@/app/utils/Heading";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";


import LiveQuizzes from "../components/Admin/quiz/LiveQuizzes";

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(6);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen">
      <Heading
        title="Live Quizzes - ELearning"
        description="Attempt all live quizzes and test your knowledge"
        keywords="quiz, quizzes, elearning, online test"
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      {/* MAIN CONTENT */}
      <LiveQuizzes />

      <Footer />
    </div>
  );
};

export default Page;