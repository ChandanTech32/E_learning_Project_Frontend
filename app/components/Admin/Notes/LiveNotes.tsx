"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./quill-dark.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const LiveNotes = () => {
  const { user } = useSelector((state: any) => state.auth);

  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [notes, setNotes] = useState<any[]>([]);
  const [editId, setEditId] = useState<string>("");
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
        "http://localhost:8000/api/v1/get-notes"
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
    if (!isAdmin) return;

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
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleEdit = (item: any) => {
    if (!isAdmin) return;

    setEditId(item._id);
    setTitle(item.title || "");
    setContent(item.content || "");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =========================
  // UPDATE
  // =========================
  const handleUpdate = async () => {
    if (!isAdmin || !editId) return;

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
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="w-[90%] m-auto py-10">

      {/* TITLE */}
      <h1 className="text-[30px] font-Poppins dark:text-white text-black mb-8">
        Notes
      </h1>

      {/* ================= EDIT FORM ================= */}
      {isAdmin && editId && (
        <div className="bg-[#f5f5f5] dark:bg-[#1b1f38] p-5 rounded mb-10 w-full 800px:w-[70%]">

          <h2 className="text-black dark:text-white text-[22px] mb-4">
            Modify Note
          </h2>

          {/* TITLE */}
          <input
            type="text"
            placeholder="Enter title"
            className="w-full p-3 rounded mb-4 outline-none bg-white text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            className="bg-[#37a39a] text-white px-5 py-2 rounded mt-4"
            onClick={handleUpdate}
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
            className="bg-white dark:bg-[#1b1f38] p-5 rounded shadow relative"
          >

            {/* ACTIONS */}
            {isAdmin && (
              <div className="absolute top-3 right-3 flex gap-3">

                <button onClick={() => handleEdit(item)}>
                  <AiOutlineEdit size={22} className="text-blue-500" />
                </button>

                <button onClick={() => handleDelete(item._id)}>
                  <AiOutlineDelete size={22} className="text-red-500" />
                </button>

              </div>
            )}

            {/* TITLE */}
            <h2 className="text-[22px] font-[600] dark:text-white text-black">
              {item.title}
            </h2>

            {/* CONTENT (FIXED HTML RENDER) */}
            <div
              className="py-4 text-[16px] text-black dark:text-[#ffffffb7] ql-editor"
              dangerouslySetInnerHTML={{
                __html: item.content || "",
              }}
            />

            {/* DATE */}
            <p className="text-[14px] text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
};

export default LiveNotes;