"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import QuizCard from "./QuizCard";
import EditQuiz from "./EditQuiz";

const LiveQuizzes = () => {
  const { user } = useSelector((state: any) => state.auth);

  const isAdmin = user?.role?.toLowerCase() === "admin";

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [editId, setEditId] = useState("");

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [answers, setAnswers] = useState<any>({});

  const [submitted, setSubmitted] = useState<any>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("quiz-submitted") || "{}");
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("quiz-submitted", JSON.stringify(submitted));
  }, [submitted]);

  useEffect(() => {
    getAllQuizzes();
  }, []);

  const getAllQuizzes = async () => {
    const res = await axios.get(
      "http://localhost:8000/api/v1/get-all-quizzes",
      { withCredentials: true }
    );

    setQuizzes(res.data.quizzes || []);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(
      `http://localhost:8000/api/v1/delete-quiz/${id}`,
      { withCredentials: true }
    );

    setQuizzes((prev) => prev.filter((q) => q._id !== id));
  };

  const handleEdit = (item: any) => {
    setEditId(item._id);
    setTitle(item.title);
    setDuration(item.duration);
    setTotalMarks(item.totalMarks);
  };

  const handleUpdate = async () => {
    if (!editId) return;

    await axios.put(
      `http://localhost:8000/api/v1/update-quiz/${editId}`,
      { title, duration, totalMarks },
      { withCredentials: true }
    );

    setEditId("");
    getAllQuizzes();
  };

  const handleSelectAnswer = (
    quizId: string,
    questionId: string,
    optionIndex: number
  ) => {
    setAnswers((prev: any) => ({
      ...prev,
      [quizId]: {
        ...prev[quizId],
        [questionId]: optionIndex,
      },
    }));
  };

  const handleSubmitQuiz = async (quizId: string) => {
    if (submitted[quizId]) return;

    const quizAnswers = answers[quizId];

    const formattedAnswers = Object.keys(quizAnswers || {}).map((qid) => ({
      questionId: qid,
      selectedAnswer: quizAnswers[qid],
    }));

    const res = await axios.post(
      `http://localhost:8000/api/v1/submit-quiz/${quizId}`,
      { answers: formattedAnswers },
      { withCredentials: true }
    );

    setSubmitted((prev: any) => ({
      ...prev,
      [quizId]: {
        score: res.data.score,
        total: res.data.totalMarks,
      },
    }));
  };

  return (
    <div className="w-[90%] m-auto py-10">

      <h1 className="text-[30px] font-Poppins mb-8 text-black dark:text-white">
         Quizzes
      </h1>

      {/* EDIT FORM (ONLY ONE) */}
      <EditQuiz
        editId={editId}
        title={title}
        duration={duration}
        totalMarks={totalMarks}
        setTitle={setTitle}
        setDuration={setDuration}
        setTotalMarks={setTotalMarks}
        handleUpdate={handleUpdate}
        setEditId={setEditId}
      />

      {/* QUIZZES LIST */}
      {quizzes.map((item: any) => (
        <QuizCard
          key={item._id}
          item={item}
          isAdmin={isAdmin}
          submitted={submitted}
          handleSelectAnswer={handleSelectAnswer}
          handleSubmitQuiz={handleSubmitQuiz}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}

    </div>
  );
};

export default LiveQuizzes;