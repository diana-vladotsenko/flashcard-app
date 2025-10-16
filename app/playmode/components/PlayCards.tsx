"use client";

import { Card } from "@/types/Card";
import { useState, useMemo, useTransition } from "react";
import { savePlaymodeStats } from "../actions";

export default function PlayClient({ cards }: { cards: Card[] }) {
  const [mode, setMode] = useState<"random" | "sequential" | null>(null);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const orderedCards = useMemo(() => {
    if (!mode) return [];
    return mode === "random"
      ? [...cards].sort(() => Math.random() - 0.5)
      : [...cards];
  }, [mode, cards]);

  if (!cards?.length)
    return <p className="text-muted-foreground">No cards available.</p>;

  if (!mode) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-medium">Choose play mode</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setMode("sequential")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Sequential
          </button>
          <button
            onClick={() => setMode("random")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Random
          </button>
        </div>
      </div>
    );
  }

  const current = orderedCards[index];

  const handleSubmit = () => {
    if (!input.trim()) return;

    const isCorrect =
      input.trim().toLowerCase() === current.answer.trim().toLowerCase();

    if (isCorrect) {
      setCorrect((c) => c + 1);
      setFeedback("✅ Correct!");
    } else {
      setWrong((w) => w + 1);
      setFeedback(`❌ Wrong! Correct: ${current.answer}`);
    }

    setTimeout(() => {
      setFeedback(null);
      setInput("");
      setIndex((i) => i + 1);
    }, 1200);
  };

  const handleSave = () => {
    startTransition(async () => {
      await savePlaymodeStats({
        correct,
        wrong,
        total: correct + wrong,
        mode,
      });
      setSaved(true);
    });
  };

  if (index >= orderedCards.length) {
    return (
      <div className="flex flex-col items-center gap-3">
        <h2 className="text-xl font-semibold">Session finished 🎉</h2>
        <p>
          Correct: {correct} / {orderedCards.length} <br />
          Wrong: {wrong}
        </p>

        {!saved ? (
          <button
            onClick={handleSave}
            disabled={isPending}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-3"
          >
            {isPending ? "Saving..." : "Save results"}
          </button>
        ) : (
          <p className="text-green-600 mt-2 text-sm">✅ Saved successfully!</p>
        )}

        <button
          onClick={() => {
            setMode(null);
            setIndex(0);
            setCorrect(0);
            setWrong(0);
            setSaved(false);
          }}
          className="mt-3 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-lg font-semibold text-center">
        {index + 1}/{orderedCards.length}: {current.question}
      </h2>

      <input
        type="text"
        className="rounded-lg border px-3 py-2 text-sm"
        placeholder="Your answer..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="
        rounded-full 
        border border-indigo-500 
        bg-white 
        px-4 py-1.5 
        text-sm font-medium text-indigo-600
        transition-colors duration-200
        hover:bg-indigo-500 hover:text-white
        active:bg-indigo-600
        disabled:opacity-50"
      >
        Submit
      </button>

      {feedback && <p className="mt-2 text-sm">{feedback}</p>}
    </div>
  );
}
