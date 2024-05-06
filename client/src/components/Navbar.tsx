import { useState } from "react";
import { HiOutlineMusicNote } from "react-icons/hi";

const Navbar = () => {
  const navItems = [
    { value: "Home", icon: <HiOutlineMusicNote /> },
    { value: "Genre", icon: <HiOutlineMusicNote /> },
    { value: "My Library", icon: <HiOutlineMusicNote /> },
  ];

  const [activeNavItem, setActiveNavItem] = useState("Home");

  return (
    <>
      <nav className="">
        <ul className="space-y-3 text-sm font-bold">
          {navItems.map((navItem, index) => {
            return (
              <li
                className={
                  `flex cursor-pointer items-center gap-2 border-l-2 border-transparent px-12 py-4 text-black-variant-2 hover:text-black-variant-2/80 ` +
                  (activeNavItem === navItem.value
                    ? "!border-secondary-1 bg-gradient-to-r from-secondary-1/5 to-secondary-2/10 text-secondary-1 hover:text-secondary-1/80"
                    : "")
                }
                onClick={() => setActiveNavItem(navItem.value)}
                key={index + 1}
              >
                <span
                  className={`bg-gradient-to-b from-red-900 to-blue-900 bg-clip-text text-lg`}
                >
                  {navItem.icon}
                </span>
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
