import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import AboutContent from "./AboutContent";
import HomeContent from "./HomeContent";

export const dynamic = "force-dynamic";

export default async function PageContent() {
  const session = await getServerSession(authOptions);

  if (session?.user?.email !== "admin@gmail.com") {
    redirect("/profile/user");
  }

  return (
    <div className="mb-28">
      <HomeContent />
      <AboutContent />
    </div>
  );
}
