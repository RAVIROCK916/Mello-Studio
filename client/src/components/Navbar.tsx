import { useState } from "react";
import {
  faBookOpen,
  faMusic,
  faRadio,
  faSquareFull,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Navbar = () => {
  const navItems = [
    { value: "Home", icon: faMusic },
    { value: "Genre", icon: faRadio },
    { value: "My Library", icon: faBookOpen },
  ];

  const [activeNavItem, setActiveNavItem] = useState("Home");

  return (
    <>
      <nav className="relative ml-px w-60">
        <ul className="relative -left-12 space-y-3 text-sm font-bold">
          {navItems.map((navItem, index) => {
            let Icon = navItem.icon as IconProp;
            return (
              <li
                className={
                  "flex cursor-pointer items-center gap-2 border-l-4 border-transparent px-12 py-4 text-black-variant-2 hover:text-black-variant-2/90 " +
                  (activeNavItem === navItem.value
                    ? "!border-secondary-1 bg-gradient-to-r from-secondary-1/5 to-secondary-2/10 text-secondary-1 hover:!text-secondary-1/90 dark:from-secondary-1/10 dark:to-black"
                    : "")
                }
                onClick={() => setActiveNavItem(navItem.value)}
                key={index + 1}
              >
                {activeNavItem === navItem.value ? (
                  <FontAwesomeIcon
                    className="bg-gradient-to-r from-primary-1 from-50% via-primary-2 via-50% to-primary-2 text-base text-white dark:text-black/95"
                    icon={Icon}
                    mask={faSquareFull}
                  />
                ) : (
                  <FontAwesomeIcon className="text-base" icon={Icon} />
                )}
                <span>{navItem.value}</span>
              </li>
            );
          })}
        </ul>
        <ul className="mt-8 space-y-8 text-sm font-bold opacity-40">
          <li>John Doe</li>
          <li>Hip Hop Remixes</li>
          <li>All out of 10s</li>
          <li>Hollywood undead</li>
        </ul>
      </nav>
    </>
  );
};
export default Navbar;
