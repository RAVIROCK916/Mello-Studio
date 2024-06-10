import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import MusicPlayer from "./components/MusicPlayer";
import Genre from "./pages/genre/Genre";
import Navbar from "./components/Navbar";
import Artist from "./pages/artist/Artist";
import Search from "./pages/search/Search";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col overflow-x-hidden px-12 py-8">
        <Header />
        <main className="mb-16 flex justify-center">
          <SignedIn>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard/genre/:genre" element={<Genre />} />
              <Route path="/dashboard/artist/:id" element={<Artist />} />
              <Route path="/dashboard/search/" element={<Search />} />
            </Routes>
            <MusicPlayer />
          </SignedIn>
          <SignedOut>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<Signup />} />
            </Routes>
          </SignedOut>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
