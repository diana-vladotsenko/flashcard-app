"use client";

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-indigo-50/30">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />

        <p className="text-sm font-medium text-gray-700">
          Loading Flashcards...
        </p>
      </div>
    </main>
  );
}
