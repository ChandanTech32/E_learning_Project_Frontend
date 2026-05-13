import React from "react";
import QuizQuestion from "./QuizQuestion";
import QuizResultBox from "./QuizResultBox";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const QuizCard = ({
  item,
  isAdmin,
  submitted,
  handleSelectAnswer,
  handleSubmitQuiz,
  handleEdit,
  handleDelete,
}: any) => {
  return (
    <div className="bg-white dark:bg-[#1b1f38] p-5 rounded mb-6">

      <h2 className="text-xl font-bold text-black dark:text-white">{item.title}</h2>

      {item.questions?.map((q: any) => (
        <QuizQuestion
          key={q._id}
          quizId={item._id}
          question={q}
          submitted={submitted[item._id]}
          handleSelectAnswer={handleSelectAnswer}
        />
      ))}

      {/* ADMIN */}
      {isAdmin && (
        <div className="flex gap-3 mt-3 text-black dark:text-white">
          <button onClick={() => handleEdit(item)}>
            <AiOutlineEdit />
          </button>

          <button onClick={() => handleDelete(item._id)}>
            <AiOutlineDelete />
          </button>
        </div>
      )}

      {/* USER SUBMIT */}
      {!isAdmin && (
        <button
          onClick={() => handleSubmitQuiz(item._id)}
          disabled={submitted[item._id]}
          className={`mt-5 px-6 py-2 text-white rounded ${
            submitted[item._id] ? "bg-gray-500" : "bg-[#37a39a]"
          }`}
        >
          {submitted[item._id] ? "Already Submitted" : "Submit Quiz"}
        </button>
      )}

      {/* RESULT */}
      {submitted[item._id] && (
        <QuizResultBox result={submitted[item._id]} />
      )}
    </div>
  );
};

export default QuizCard;