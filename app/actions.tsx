"use server";

// import { revalidatePath } from "next/cache";
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
