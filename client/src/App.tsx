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
import Queue from "./pages/queue/Queue";
import { ClerkProvider } from "@clerk/clerk-react";
import { useTheme } from "./components/theme-provider";
import { useEffect } from "react";
import { dark, experimental__simple } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: theme === "dark" ? dark : experimental__simple,
        variables: {
          colorPrimary: "#45BED5",
        },
      }}
    >
      <Router>
        <div className="flex min-h-screen flex-col overflow-x-hidden px-12 py-8 dark:bg-black dark:text-neutral-200">
          <Header />
          <main className="mb-16 flex justify-center">
            <SignedIn>
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard/genre/:genre" element={<Genre />} />
                <Route path="/dashboard/artist/:id" element={<Artist />} />
                <Route path="/dashboard/search/" element={<Search />} />
                <Route path="/dashboard/queue" element={<Queue />} />
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
    </ClerkProvider>
  );
}

export default App;
