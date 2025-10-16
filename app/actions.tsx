"use server";

// import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function getCards() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("card").select();

    if (error) throw new Error(error.message);

    return data;
  } catch (err) {
    throw err;
  }
}
