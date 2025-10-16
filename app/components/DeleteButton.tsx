"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteFlashcard } from "../actions";

type Props = {
  id: number;
};

export default function DeleteButton({ id }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deleteFlashcard(id)
        .then(() => {
          router.refresh();
        })
        .catch((err) => {
          console.error("Error deleting card:", err);
          alert("Failed to delete card. Try again.");
        });
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-xs bg-white px-3 py-1 font-medium text-red-600 hover:text-red-700 rounded-md"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
