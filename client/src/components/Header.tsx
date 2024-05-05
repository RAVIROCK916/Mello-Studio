import { Link } from "react-router-dom";
import Logo from "./Logo";
import { MdLogin, MdPerson } from "react-icons/md";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
	const user = useUser();
	const listItemStyle =
		"flex items-center gap-1 py-2 px-4 cursor-pointer hover:text-black-variant-2/70";
	return (
		<header className="flex justify-between items-center px-12 py-8">
			<Logo />
			<ul className="flex gap-8 text-sm tracking-wide text-black-variant-2">
				{user.isSignedIn ? (
					<li className={listItemStyle}>
            <UserButton afterSignOutUrl="/" />
					</li>
				) : (
					<>
						<li className={listItemStyle}>
							<MdPerson />
							<Link to="/login">Login</Link>
						</li>
						<li className={listItemStyle}>
							<MdLogin />
							<Link to="/sign-up">Sign Up</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
};
export default Header;
