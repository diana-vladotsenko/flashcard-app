"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createFlashcard(formData: FormData) {
  try {
    const answer = String(formData.get("answer") ?? "").trim();
    const question = String(formData.get("question") ?? "").trim();
    const categoryIdRaw = formData.get("category_id");
    const category_id = categoryIdRaw != null ? Number(categoryIdRaw) : NaN;

    if (!answer || !question || !Number.isFinite(category_id)) return;

    const supabase = await createClient();
    const { error } = await supabase.from("card").insert({
      answer,
      question,
      category_id,
    });

    if (error) throw new Error(error.message);

    revalidatePath("/");
  } catch (err) {
    throw err;
  }
}
