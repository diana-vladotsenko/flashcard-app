import CreateForm from "./components/CreateForm";
import { getCategories } from "../actions";

export default async function Page() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full max-w-5xl p-5 space-y-6">
        <h2 className="text-2xl font-medium">Create Form</h2>
        <CreateForm categories={categories ?? []} />
      </div>
    </main>
  );
}
