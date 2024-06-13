import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  MdLogin,
  MdNotificationsNone,
  MdOutlineSettings,
  MdPerson,
} from "react-icons/md";
import { UserButton, useUser } from "@clerk/clerk-react";
import SearchBar from "./SearchBar";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import { dark, experimental__simple } from "@clerk/themes";

const Header = () => {
  const user = useUser();
  const { theme } = useTheme();
  const listItemStyle =
    "flex items-center font-semibold gap-1 cursor-pointer hover:text-black-variant-2/70 dark:hover:text-neutral-400";
  const iconItemStyle =
    "flex items-center gap-1 text-xl text-black-variant-2 bg-neutral-100 rounded-md p-[9px] cursor-pointer hover:text-black-variant-2/70 dark:text-neutral-200 dark:bg-transparent dark:border dark:border-neutral-800";
  const renderContent = () => {
    if (user.isSignedIn) {
      return (
        <div className="flex flex-1 items-center justify-end gap-8">
          <SearchBar />
          <div className="flex items-center gap-6">
            <ModeToggle />
            {/* <div className={iconItemStyle}>
              <MdNotificationsNone />
            </div>
            <div className={iconItemStyle}>
              <MdOutlineSettings />
            </div> */}
            <div className={listItemStyle}>
              <UserButton
                afterSignOutUrl="/login"
                appearance={{
                  baseTheme: theme === "dark" ? dark : experimental__simple,
                  elements: {
                    userButtonAvatarBox: "rounded-md size-9",
                    userButtonTrigger: "rounded-md",
                  },
                }}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <ul className="flex flex-1 flex-row-reverse gap-8 text-sm tracking-wide text-black-variant-2 dark:text-neutral-200">
          <li className={listItemStyle}>
            <MdPerson />
            <Link to="/login">Login</Link>
          </li>
          <li className={listItemStyle}>
            <MdLogin />
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <ModeToggle />
        </ul>
      );
    }
  };

  return (
    <header className="mb-10 flex items-center justify-between gap-20">
      <Logo />
      {renderContent()}
    </header>
  );
};
export default Header;
