import { createClient } from "@/lib/supabase/server";
import CreateForm from "./components/CreateForm";

export default async function Page() {
  const supabase = await createClient();
  const { data: categories = [] } = await supabase
    .from("category")
    .select("id, name")
    .order("name");

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl p-5 space-y-6">
        <h2 className="text-2xl font-medium">Create Form</h2>
        <CreateForm categories={categories ?? []} />
      </div>
    </main>
  );
}
