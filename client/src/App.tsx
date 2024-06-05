import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col overflow-x-hidden px-12 py-8">
        <Header />
        <main className="flex flex-col items-center justify-center">
          <SignedIn>
            <Routes>
              <Route path="/" element={<Dashboard />} />
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
