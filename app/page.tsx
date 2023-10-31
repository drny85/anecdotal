import StudensTable from "@/components/StudentsTable";
import Header from "@/components/Header";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col max-w-xl  mt-4 space-y-6">
      <Header />
      <StudensTable />
    </main>
  );
};

export default Home;
