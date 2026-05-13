"use client";

import React from "react";

type Props = {
  editId: string;
  title: string;
  duration: string;
  totalMarks: string;

  setTitle: (val: string) => void;
  setDuration: (val: string) => void;
  setTotalMarks: (val: string) => void;

  handleUpdate: () => void;
  setEditId: (val: string) => void;
};

const EditQuiz = ({
  editId,
  title,
  duration,
  totalMarks,
  setTitle,
  setDuration,
  setTotalMarks,
  handleUpdate,
  setEditId,
}: Props) => {
  if (!editId) return null;

  return (
    <div className="p-4 border rounded-md mb-6 bg-white dark:bg-gray-900 dark:text-white text-black">

      <h2 className="text-xl font-bold mb-4 dark:text-white text-black">Edit Quiz</h2>

      {/* TITLE */}
      <input
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      {/* DURATION */}
      <input
        className="border p-2 w-full mb-2"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration"
      />

      {/* TOTAL MARKS */}
      <input
        className="border p-2 w-full mb-2"
        value={totalMarks}
        onChange={(e) => setTotalMarks(e.target.value)}
        placeholder="Total Marks"
      />

      {/* BUTTONS */}
      <div className="flex gap-3 mt-4">

        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={() => setEditId("")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default EditQuiz;