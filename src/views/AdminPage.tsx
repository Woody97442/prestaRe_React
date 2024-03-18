import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import ToastMessage from "@/components/ToastMessage";
import ToolBar from "@/components/ToolBar";

function AdminPage() {
  return (
    <>
      <header>
        <Navbar />
        <ToolBar />
      </header>
      <main>
        <Table />
      </main>
      <footer>
        <ToastMessage />
        <Footer />
      </footer>
    </>
  );
}

export default AdminPage;
