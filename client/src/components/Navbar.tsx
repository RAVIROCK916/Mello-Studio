import { useState } from "react";
import { HiOutlineMusicNote } from "react-icons/hi";

const Navbar = () => {
	const navItems = [
		{ value: "Home", icon: <HiOutlineMusicNote /> },
		{ value: "Genre", icon: <HiOutlineMusicNote /> },
		{ value: "My Library", icon: <HiOutlineMusicNote /> },
	];
	const navItemStyle =
    "flex items-center gap-2 py-2 px-4 cursor-pointer hover:text-black-variant-2/80";
  const activeNavItemStyle = "text-primary-1 border-l-4 border-secondary-1";

	const [activeNavItem, setActiveNavItem] = useState("Home");

	return (
		<>
			<nav>
				<ul className="font-bold">
					{navItems.map((navItem, index) => {
						return (
							<li
								className={
									navItemStyle +
									(activeNavItem === navItem.value ? activeNavItemStyle : "")
								}
								onClick={() => setActiveNavItem(navItem.value)}
								key={index + 1}
							>
								<span>{navItem.icon}</span>
								{navItem.value}
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
};
export default Navbar;
