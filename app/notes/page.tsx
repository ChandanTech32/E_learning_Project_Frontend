"use client";

import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LiveNotes from "../components/Admin/Notes/LiveNotes";

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  return (
    <div className="min-h-screen">
      <Heading
        title="Live Notes - ELearning"
        description="Read all live notes and updates"
        keywords="notes, elearning, live notes"
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      {/* MAIN CONTENT */}
      <LiveNotes />

      <Footer />
    </div>
  );
};

export default Page;
