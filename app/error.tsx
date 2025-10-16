"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50 text-red-700">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Something went wrong 😞</h2>
        <p className="mt-2 text-sm">{error.message}</p>
      </div>
    </div>
  );
}
