import { Navbar } from "@/components/Navbar";
import { DashboardView } from "@/components/DashboardView";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <DashboardView />
      </main>
    </div>
  );
}