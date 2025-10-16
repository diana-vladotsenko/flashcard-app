"use client";
import { createFlashcard } from "../actions";
import { Category } from "@/types/Category";
import { useTransition } from "react";

export default function CreateForm({ categories }: { categories: Category[] }) {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await createFlashcard(formData);
    });
  }

  return (
    <form
      action={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 shadow-sm"
    >
      <div className="relative p-5 md:p-6">
        <div
          className="absolute left-0 top-0 h-full w-2 rounded-l-2xl"
          style={{ backgroundColor: "#6366f1" }}
        />

        <h2 className="text-mt font-semibold text-gray-900">Form</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-xs text-gray-600">Category</span>
            <select
              name="category_id"
              className="rounded-lg border px-3 py-2 text-sm"
              defaultValue=""
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

          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs text-gray-600">Question</span>
            <input
              name="question"
              placeholder="Type your question…"
              className="rounded-lg border px-3 py-2 text-sm"
            />
          </label>

          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-xs text-gray-600">Answer</span>
            <textarea
              name="answer"
              placeholder="Write the answer…"
              className="min-h-[120px] rounded-lg border px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="submit"
            className="
              rounded-full 
              border border-indigo-500 
              bg-white 
              px-4 py-1.5 
              text-sm font-medium text-indigo-600
              transition-colors duration-200
              hover:bg-indigo-500 hover:text-white
              active:bg-indigo-600
              disabled:opacity-50
            "
          >
            {isPending ? "Adding..." : "Add Flashcard"}
          </button>
        </div>
      </div>
    </form>
  );
}
