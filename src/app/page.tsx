import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(options);

  if (typeof window === "undefined" && !session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex h-screen flex-col items-center bg-gray-100">
      <header className="bg-blue-500 w-full text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold">
            Welcome, {session?.user?.name || "User"}!
          </h1>
          <p className="text-lg mt-2">
            Explore weather updates, latest news, and real-time financial data.
          </p>
        </div>
      </header>

      <section className="py-12 px-6 max-w-7xl mx-auto">
         
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Weather Dashboard</h2>
          <p className="text-gray-600 mb-6">
            Stay updated with real-time weather information, 7-day forecasts,
            and geolocation-based data.
          </p>
          <Image
            className="w-[700px]"
            src="https://ik.imagekit.io/n48utivtc/Screenshot%202025-01-05%20024614.png?updatedAt=1736061964763"
            alt="Description of the image"
            width={784} 
            height={540}
            // height={auto} =
          />
          <div className="flex justify-center">
            <Link href="/weather">
              <Button variant="outline" className="text-blue-500">
                View Weather
              </Button>
            </Link>
          </div>
        </div> 
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          <p className="text-gray-600 mb-6">
            Browse the latest headlines across categories like Technology,
            Sports, Business, Health, and Entertainment.
          </p>
          <Image
            className="w-[700px]"
            src="https://ik.imagekit.io/n48utivtc/Screenshot%202025-01-05%20130102.png?updatedAt=1736062285934"
            alt="Description of the image"
            width={784}
            height={540}
          />
          <div className="flex justify-center">
            <Link href="/news">
              <Button variant="outline" className="text-blue-500">
                View News
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Financial Insights</h2>
          <p className="text-gray-600 mb-6">
            Analyze real-time stock data, interactive charts, and historical
            trends for smarter financial decisions.
          </p>
          <Image
            className="w-[700px]"
            src="https://ik.imagekit.io/n48utivtc/Screenshot%202025-01-05%20141616.png?updatedAt=1736069821828"
            alt="Description of the image"
            width={784}
            height={540}
          />
          <div className="flex justify-center">
            <Link href="/finance">
              <Button variant="outline" className="text-green-500">
                Explore Stocks
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 w-full text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Weather, News & Finance Dashboard
          </p> 
        </div>
      </footer>
    </main>
  );
}
