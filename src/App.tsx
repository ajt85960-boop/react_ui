import './App.css'
import {Routes, Route, useLocation} from "react-router-dom";
import Index from "./views/index.tsx";
import Classify from "./views/classify.tsx";
import Footer from "./components/footer.tsx";
import Details from "./views/details.tsx";
import Profile from "./views/profile.tsx";

function App() {
  const location = useLocation();

  const isDetailsPage = location.pathname.startsWith('/details');

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/classify" element={<Classify />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!isDetailsPage && <Footer />}
    </>
  )
}

export default App
