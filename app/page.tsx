"use client";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import StudensTable from "./components/StudentsTable";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  if (!user) {
    console.log("no user");

    router.replace("/auth");
  }
  return (
    <main className="flex min-h-screen flex-col max-w-xl  mt-4 space-y-6">
      <Header />
      <StudensTable />
    </main>
  );
}
