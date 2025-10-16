"use server";

import { createClient } from "@/lib/supabase/server";

export async function savePlaymodeStats({
  correct,
  wrong,
  total,
  mode,
}: {
  correct: number;
  wrong: number;
  total: number;
  mode: "random" | "sequential";
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("playmode_stats").insert([
    {
      correct,
      wrong,
      total,
      mode,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}
