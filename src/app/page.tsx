
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) { 
    redirect("api/auth/signin");
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name || "User"}!</h1>
    </div>
  );
}
