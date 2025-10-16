"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getCards() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("card")
      .select(
        `
      id,
      question,
      answer,
      category_id,
      category (
        id,
        name
      )
    `
      )
      .order("id", { ascending: true });

    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getCategories() {
  try {
    const supabase = await createClient();
    const { data: categories, error } = await supabase
      .from("category")
      .select("id, name")
      .order("name");

    if (error) throw error;
    return categories ?? [];
  } catch (err) {
    throw err;
  }
}

export async function updateFlashcard(formData: FormData) {
  const id = Number(formData.get("id"));
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const categoryIdRaw = formData.get("category_id");
  const category_id = categoryIdRaw != null ? Number(categoryIdRaw) : NaN;

  if (!id || !question || !answer) return;

  const supabase = await createClient();
  const { error } = await supabase
    .from("card")
    .update({ question, answer, category_id })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/");
}
