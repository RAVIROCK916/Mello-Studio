import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
	return (
		<Router>
			<div className="">
				<Header />
				<main className="flex justify-center my-4">
					<SignedIn>
						<Routes>
							<Route path="/" element={<Home />} />
						</Routes>
					</SignedIn>
					<SignedOut>
						<Routes>
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
