import Navbar from "./navbar/page";
import Footer from "./footer/page";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div className="flex flex-col min-h-screen font-sans text-gray-900">
        <Navbar/>
        <main className="flex-grow">
            {children}
        </main>
        <Footer/>
      </div>
    );
}

export default Layout;
