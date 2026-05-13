"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";

import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import DashboardHero from "@/app/components/Admin/DashboardHero";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "@/app/components/Admin/Notes/quill-dark.css";


const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const LiveNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [editId, setEditId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getAllNotes();
  }, []);

  // =========================
  // GET NOTES
  // =========================
  const getAllNotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/get-notes",
        { withCredentials: true }
      );

      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/delete-note/${id}`,
        { withCredentials: true }
      );

      toast.success("Note Deleted");

      setNotes((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item: any) => {
    setEditId(item._id);
    setTitle(item.title || "");
    setContent(item.content || "");

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  // =========================
  // UPDATE
  // =========================
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/update-note/${editId}`,
        { title, content },
        { withCredentials: true }
      );

      toast.success("Note Updated");

      setEditId("");
      setTitle("");
      setContent("");

      getAllNotes();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0f172a] transition duration-300">

      {/* SIDEBAR */}
      <div className="hidden 800px:block w-[18%] fixed left-0 top-0 h-full">
        <AdminSidebar />
      </div>

      {/* MAIN */}
      <div className="w-full 800px:ml-[18%]">

        <DashboardHero />

        <div className="p-5">

          <h1 className="text-[30px] font-Poppins text-black dark:text-white mb-8">
            Notes
          </h1>

          {/* ================= EDIT FORM ================= */}
          {editId && (
            <div className="bg-[#f5f5f5] dark:bg-[#1b1f38] p-5 rounded mb-10 w-full 800px:w-[70%]">

              <h2 className="text-black dark:text-white text-[22px] mb-4">
                Modify Note
              </h2>

              {/* TITLE */}
              <input
                type="text"
                className="w-full p-3 rounded mb-4 outline-none bg-white dark:bg-[#0f172a] text-black dark:text-white border border-gray-300 dark:border-gray-700"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />

              {/* QUILL EDITOR */}
              <div className="quill-wrapper bg-white dark:bg-[#0f172a] rounded">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  placeholder="Enter content..."
                />
              </div>

              <button
                onClick={handleUpdate}
                className="mt-4 bg-[#37a39a] text-white px-5 py-2 rounded"
              >
                Update Note
              </button>
            </div>
          )}

          {/* ================= NOTES GRID ================= */}
          <div className="grid grid-cols-1 800px:grid-cols-2 gap-5">

            {notes?.map((item: any) => (
              <div
                key={item._id}
                className="bg-[#f9f9f9] dark:bg-[#1b1f38] p-5 rounded shadow relative transition duration-300"
              >

                {/* ACTIONS */}
                <div className="absolute top-3 right-3 flex gap-3">

                  <button onClick={() => handleEdit(item)}>
                    <AiOutlineEdit size={22} className="text-blue-500" />
                  </button>

                  <button onClick={() => handleDelete(item._id)}>
                    <AiOutlineDelete size={22} className="text-red-500" />
                  </button>

                </div>

                {/* TITLE */}
                <h2 className="text-[22px] font-[600] text-black dark:text-white">
                  {item.title}
                </h2>

                {/* CONTENT (FIXED RENDER) */}
                <div
                  className="py-4 text-[16px] text-gray-700 dark:text-[#ffffffb7] ql-editor"
                  dangerouslySetInnerHTML={{
                    __html: item.content || "",
                  }}
                />

                {/* DATE */}
                <p className="text-[14px] text-gray-500 dark:text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
};

export default LiveNotes;