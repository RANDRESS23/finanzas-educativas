import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import FA2Auth from "./FA2Auth";

export default async function FA2Container() {
  const session = await getServerSession(authOptions);

  return <FA2Auth session={session} />;
}
