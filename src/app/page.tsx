import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import ClientWeatherDashboard from "./components/ClientWeather";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {session.user?.name || "User"}!
        </h1>
      </div>
      <ClientWeatherDashboard />
    </main>
  );
}
