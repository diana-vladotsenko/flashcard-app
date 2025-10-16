"use client";

import { useState, useTransition } from "react";
import { updateFlashcard } from "../actions";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  currentQuestion: string;
  currentAnswer: string;
  currentCategory: string;
  categories: { id: number; name: string }[];
};

export default function UpdateTaskForm({
  id,
  currentQuestion,
  currentAnswer,
  currentCategory,
  categories,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState(currentQuestion);
  const [answer, setAnswer] = useState(currentAnswer);
  const [category, setCategory] = useState(currentCategory);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await updateFlashcard(formData);
      router.refresh();
      setIsOpen(false);
    });
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl w-full max-w-md">
            <div
              className="absolute left-0 top-0 h-full w-2 rounded-l-2xl"
              style={{ backgroundColor: "#6366f1" }}
            />

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-5">
                Update Flashcard
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="hidden" name="id" value={id} />

                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Question</span>
                  <input
                    name="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Write your question..."
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Answer</span>
                  <textarea
                    name="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write the answer..."
                    className="min-h-[100px] rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600">Category</span>
                  <select
                    name="category_id"
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setQuestion(currentQuestion);
                      setAnswer(currentAnswer);
                      setCategory(currentCategory);
                    }}
                    className="rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isPending || !question.trim() || !answer.trim()}
                    className="rounded-full border border-indigo-500 bg-white px-4 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-500 hover:text-white transition disabled:opacity-50"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-xs font-medium text-indigo-600 hover:text-indigo-500 transition"
      >
        Edit
      </button>
    </>
  );
}
