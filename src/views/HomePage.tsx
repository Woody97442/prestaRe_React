import AuthDialog from "@/components/Auth/AuthDialog";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import ToastMessage from "@/components/ToastMessage";
import ToolBar from "@/components/ToolBar";

function HomePage() {
  return (
    <>
      <header>
        <Navbar />
        <AuthDialog />
      </header>
      <main>
        <ToolBar />
        <Providers />
      </main>
      <footer>
        <ToastMessage />
        <Footer />
      </footer>
    </>
  );
}

export default HomePage;
