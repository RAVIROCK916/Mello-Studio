import { useState } from "react";
import { FaRegSquareFull, FaSquareFull } from "react-icons/fa6";
import { HiOutlineMusicNote } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const navItems = [
    { value: "Home", icon: HiOutlineMusicNote },
    { value: "Genre", icon: HiOutlineMusicNote },
    { value: "My Library", icon: HiOutlineMusicNote },
  ];

  const [activeNavItem, setActiveNavItem] = useState("Home");

  return (
    <>
      <nav className="relative ml-px w-1/6">
        <ul className="relative -left-12 space-y-3 text-sm font-bold">
          {navItems.map((navItem, index) => {
            let Icon = navItem.icon;
            return (
              <li
                className={
                  "flex cursor-pointer items-center gap-2 border-l-4 border-transparent px-12 py-4 text-black-variant-2 hover:text-black-variant-2/90 " +
                  (activeNavItem === navItem.value
                    ? "!border-secondary-1 bg-gradient-to-r from-secondary-1/5 to-secondary-2/10 text-secondary-1 hover:!text-secondary-1/90"
                    : "")
                }
                onClick={() => setActiveNavItem(navItem.value)}
                key={index + 1}
              >
                {/* <span>
                  <Icon className="bg-gradient-to-r from-pink-500 to-violet-500 text-lg text-white" />
                </span> */}
                <div className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-2xl text-transparent">
                  <Icon
                    className="bg-gradient-to-r from-blue-400 to-purple-600 text-white"
                    mask={`url(${FaSquareFull})`}
                  />
                  {/* <FontAwesomeIcon
                    icon="'House'"
                    mask={`${FaSquareFull}`}
                  /> */}
                </div>
                <span>{navItem.value}</span>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
