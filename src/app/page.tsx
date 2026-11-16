import { redirect } from "next/navigation";

export default function Home() {
  // Entry point is the landing page; login is reached from there.
  redirect("/ui");
}
