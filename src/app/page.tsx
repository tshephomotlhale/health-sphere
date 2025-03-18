import JournalForm from "@/components/journals-form";


export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold mb-5">Welcome Home</h1>
      <JournalForm/>
      
    </main>
  );
}
