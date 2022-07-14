import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import CartModal from "./components/CartModal";
import LogIn from "./components/LogIn";
import MakePurchase from "./pages/MakePurchase";
import CompletePurchase from "./pages/CompletePurchase";
import { GlobalProvider } from "./context";

function App() {
  return (
    <HashRouter>
      <GlobalProvider>
        <Navbar />
        <CartModal />
        <LogIn />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/galeria/:id" element={<Gallery />} />
          <Route path="/acerca-de-grace" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/realizar-compra" element={<MakePurchase />} />
          <Route path="/finalizar-compra" element={<CompletePurchase />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </GlobalProvider>
    </HashRouter>
  );
}

export default App;
