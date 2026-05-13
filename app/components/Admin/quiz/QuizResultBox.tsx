import React from "react";

const QuizResultBox = ({ result }: any) => {
  return (
    <div className="mt-5 p-5 rounded-xl border border-green-300 dark:border-green-700 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 shadow-md">

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🎉</span>
        <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
          Quiz Completed!
        </h3>
      </div>

      {/* Message */}
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
        Great effort! Keep practicing to improve your score 🚀
      </p>

      {/* Score Box */}
      <div className="flex items-center justify-between bg-white dark:bg-[#1b1f38] p-4 rounded-lg shadow-sm">

        <div>
          <p className="text-xs text-gray-500">Your Score</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {result.score} / {result.total}
          </p>
        </div>

        {/* Progress Circle (simple visual) */}
        <div className="text-sm font-medium text-green-600 dark:text-green-300">
          {Math.round((result.score / result.total) * 100)}%
        </div>

      </div>
    </div>
  );
};

export default QuizResultBox;