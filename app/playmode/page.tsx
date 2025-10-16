import { getCards } from "../actions";
import PlayCards from "./components/PlayCards";

export default async function PlayPage() {
  const cards = await getCards();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-5">
      <h1 className="text-2xl font-semibold mb-6">Play Mode</h1>
      <PlayCards cards={cards} />
    </main>
  );
}
