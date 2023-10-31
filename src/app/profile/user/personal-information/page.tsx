import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

export default async function PersonalInformationPage() {
  const session = await getServerSession();

  if (session?.user?.email === "admin@gmail.com") {
    return redirect("/profile/admin");
  }

  return (
    <div>
      <h1>PersonalInformationPage</h1>
    </div>
  );
}
