import { paintings } from "../../public/data/paintings";
import { HomePageClient } from "./home-page-client";

export default function HomePage() {

  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-josefin pt-5 sm:pt-10 md:pt-0 relative md:pl-10 lg:!pl-0">
      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-7xl px-4 mx-auto text-center">
        <HomePageClient paintings={paintings} />
      </main>
    </div>
  );
}