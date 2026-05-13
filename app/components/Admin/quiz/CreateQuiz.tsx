"use client";

import { styles } from "@/app/styles/style";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const CreateQuiz = () => {
  // STATES
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const emojiRef = useRef<any>(null);

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    },
  ]);

  // ================= GET COURSES =================
  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/get-admin-courses",
        { withCredentials: true }
      );
      setCourses(res.data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CLOSE EMOJI =================
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ================= EMOJI =================
  const handleEmojiClick = (emojiData: any) => {
    setTitle((prev) => prev + emojiData.emoji);
  };

  // ================= QUESTION CHANGE =================
  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  // ================= OPTION CHANGE =================
  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  // ================= ADD QUESTION =================
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ]);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !courseId || !duration || !totalMarks) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/v1/create-quiz",
        {
          title,
          courseId,
          duration,
          totalMarks,
          questions,
        },
        { withCredentials: true }
      );

      toast.success("Quiz Created Successfully");

      // RESET
      setTitle("");
      setCourseId("");
      setDuration("");
      setTotalMarks("");
      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
          explanation: "",
        },
      ]);

      // ✅ FIXED SCROLL (correct place)
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="w-[90%] 800px:w-[70%] m-auto py-10 min-h-screen bg-white dark:bg-black transition-colors duration-300">

      {/* HEADING */}
      <h1 className="text-[30px] font-Poppins dark:text-white text-black pb-5">
        Create Quiz
      </h1>

      <form onSubmit={handleSubmit}>

        {/* TITLE */}
        <label className={styles.label}>Quiz Title</label>

        <div className="relative" ref={emojiRef}>
          <input
            type="text"
            placeholder="Enter quiz title"
            className={`${styles.input} bg-white text-black dark:bg-[#1f2937] dark:text-white pr-14`}
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

        {/* COURSE */}
        <label className={styles.label}>Select Course</label>
        <select
          className={`${styles.input} bg-white text-black dark:bg-[#1f2937] dark:text-white`}
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        >
          <option value="">Choose Course</option>
          {courses.map((course: any) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>

        <br /><br />

        {/* DURATION */}
        <label className={styles.label}>Duration</label>
        <input
          type="number"
          className={`${styles.input} bg-white text-black dark:bg-[#1f2937] dark:text-white`}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <br /><br />

        {/* MARKS */}
        <label className={styles.label}>Total Marks</label>
        <input
          type="number"
          className={`${styles.input} bg-white text-black dark:bg-[#1f2937] dark:text-white`}
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
        />

        <br /><br />

        {/* QUESTIONS */}
        <h2 className="text-[24px] font-semibold dark:text-white text-black pb-5">
          Questions
        </h2>

        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="border border-gray-300 dark:border-[#ffffff1c] p-5 rounded mb-8"
          >
            <label className={styles.label}>Question</label>
            <input
              type="text"
              className={`${styles.input} bg-white text-black dark:bg-[#1f2937] dark:text-white`}
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
            />

            <br /><br />

            {q.options.map((option, i) => (
              <div key={i} className="mb-4">
                <label className={styles.label}>Option {i + 1}</label>
                <input
                  type="text"
                  className={`${styles.input} bg-white text-black dark:bg-[#1f2937] dark:text-white`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(qIndex, i, e.target.value)
                  }
                />
              </div>
            ))}

            <label className={styles.label}>Correct Answer</label>
            <input
              type="number"
              min={0}
              max={3}
              className={`${styles.input} bg-white text-black dark:bg-[#1f2937] dark:text-white`}
              value={q.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(
                  qIndex,
                  "correctAnswer",
                  Number(e.target.value)
                )
              }
            />

            <br /><br />

            <label className={styles.label}>Explanation</label>
            <textarea
              rows={4}
              className={`${styles.input} bg-white text-black dark:bg-[#1f2937] dark:text-white`}
              value={q.explanation}
              onChange={(e) =>
                handleQuestionChange(qIndex, "explanation", e.target.value)
              }
            />
          </div>
        ))}

        {/* ADD QUESTION */}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 text-white px-5 py-2 rounded"
        >
          + Add Question
        </button>

        <br /><br />

        {/* SUBMIT */}
        <input
          type="submit"
          value="Create Quiz"
          className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-white rounded cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateQuiz;