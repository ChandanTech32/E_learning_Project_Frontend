"use client";

import { styles } from "@/app/styles/style";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import "./quill-dark.css";

// SSR safe Quill
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const emojiRef = useRef<any>(null);

  // =========================
  // OUTSIDE CLICK CLOSE EMOJI
  // =========================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =========================
  // ADD EMOJI TO TITLE
  // =========================
  const handleEmojiClick = (emojiData: any) => {
    setTitle((prev) => prev + emojiData.emoji);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/create-note",
        { title, content },
        { withCredentials: true }
      );

      toast.success("Note Created Successfully");

      setTitle("");
      setContent("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-[90%] 800px:w-[60%] m-auto py-10">
      <h1 className="text-[30px] font-Poppins dark:text-white text-black pb-5">
        Create Note
      </h1>

      <form onSubmit={handleSubmit}>
        {/* ================= TITLE ================= */}
        <label className={styles.label}>Note Title</label>

        <div className="relative" ref={emojiRef}>
          <input
            type="text"
            placeholder="Enter note title"
            className={`${styles.input} pr-14`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowEmoji(!showEmoji)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[24px]"
          >
            😊
          </button>

          {showEmoji && (
            <div className="absolute right-0 top-[60px] z-50">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <br />
        <br />

        {/* ================= CONTENT ================= */}
        <label className={styles.label}>Note Content</label>

        <div className="rounded-md quill-wrapper">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your note here..."
            className="editor"
          />
        </div>

        <br />
        <br />

        {/* ================= SUBMIT ================= */}
        <input
          type="submit"
          value="Create Note"
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-white rounded cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateNote;