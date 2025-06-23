import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SpotifyPage from "./pages/Spotify";
import Callback from "./pages/Callback";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/spotify" element={<SpotifyPage />} />
      <Route path="/callback" element={<Callback />} />
    </Routes>
  );
}

export default App;
