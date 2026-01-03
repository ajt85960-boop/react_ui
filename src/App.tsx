import './App.css'
import { Routes, Route } from "react-router-dom";
import Index from "./views/index.tsx";
import Classify from "./views/classify.tsx";
import Footer from "./components/footer.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/classify" element={<Classify />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
