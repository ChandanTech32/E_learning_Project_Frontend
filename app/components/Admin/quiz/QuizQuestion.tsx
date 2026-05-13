import React from "react";

const QuizQuestion = ({
  quizId,
  question,
  submitted,
  handleSelectAnswer,
}: any) => {
  if (!question) return null;

  return (
    <div className="mt-5 p-4 rounded-lg bg-gray-50 dark:bg-[#151a2e] border border-gray-200 dark:border-gray-700 transition-all text-black dark:text-white">

      {/* Question */}
      <p className="font-semibold mb-3 min-h-[24px]">
        {question?.question || "Loading question..."}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {question?.options?.map((opt: string, idx: number) => (
          <label
            key={`${question._id}-${idx}`}
            className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300"
          >
            <input
              type="radio"
              name={`${quizId}-${question._id}`}
              disabled={!!submitted}
              className="accent-[#37a39a]"
              onChange={() =>
                handleSelectAnswer(quizId, question._id, idx)
              }
            />

            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;