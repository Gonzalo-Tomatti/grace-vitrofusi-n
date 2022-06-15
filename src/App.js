import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Galery from "./pages/Galery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria/:id" element={<Galery />} />
        <Route path="/acerca-de-grace" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
