"use client";

type Props = {
  question: string;
  answer: string;
  category?: string;
};

export default function Flashcard({ question, answer, category }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className="absolute left-0 top-0 h-full w-2"
        style={{ backgroundColor: "#6366f1" }}
      />

      <div className="relative z-10 flex min-h-[14rem] flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: "#6366f1" }}
          >
            {category || "General"}
          </span>
          <span className="text-[11px] text-gray-400">Flashcard</span>
        </div>

        <div className="mt-3">
          <p className="text-lg font-semibold text-gray-900">{question}</p>
        </div>

        <details className="mt-4 group/ans">
          <summary className="inline-flex cursor-pointer select-none items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
            <span
              className="
  rounded-full 
    border border-indigo-500 
    bg-white 
    px-3 py-1.5 
    text-xs font-medium text-indigo-600
    transition-colors duration-200
    hover:bg-indigo-500 hover:text-white
    active:bg-indigo-600
    disabled:opacity-50
  "
            >
              View answer
            </span>
          </summary>
          <div
            className="
              relative mt-3 rounded-lg bg-slate-100/60 p-3 text-sm text-gray-700
              max-h-28 overflow-hidden transition-[max-height] duration-300
              group-open/ans:max-h-[999px] group-open/ans:overflow-visible
            "
          >
            <div
              className="
                pointer-events-none absolute inset-x-0 bottom-0 h-12
                bg-gradient-to-t from-slate-100/60 to-transparent
                opacity-100 transition-opacity duration-200
                group-open/ans:opacity-0
              "
            />
            <pre className="whitespace-pre-wrap break-words leading-relaxed font-sans">
              {answer}
            </pre>
          </div>
        </details>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-100/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-indigo-50/70 group-hover:to-indigo-100/70" />
    </div>
  );
}
