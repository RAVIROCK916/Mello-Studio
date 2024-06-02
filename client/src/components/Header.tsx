import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  MdLogin,
  MdNotificationsNone,
  MdOutlineSettings,
  MdPerson,
  MdSearch,
} from "react-icons/md";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const user = useUser();
  const listItemStyle =
    "flex items-center font-semibold gap-1 cursor-pointer hover:text-black-variant-2/70";
  const iconItemStyle =
    "flex items-center gap-1 text-xl text-black-variant-2 bg-neutral-100 rounded-full p-1.5 cursor-pointer hover:text-black-variant-2/70";
  const renderContent = () => {
    if (user.isSignedIn) {
      return (
        <div className="flex flex-1 items-center justify-between gap-6">
          <div className="relative flex-1">
            <MdSearch className="absolute right-[2%] top-[50%] -translate-y-1/2 transform cursor-pointer text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md bg-neutral-100 px-4 py-2"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className={iconItemStyle}>
              <MdNotificationsNone />
            </div>
            <div className={iconItemStyle}>
              <MdOutlineSettings />
            </div>
            <div className={listItemStyle}>
              <UserButton afterSignOutUrl="/login" />
            </div>
          </div>
        </div>
      );
    }
    return (
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
    );
  };

  return (
    <header className="mb-10 flex items-center justify-between gap-20">
      <Logo />
      <ul className="flex flex-1 gap-8 text-sm tracking-wide text-black-variant-2">
        {renderContent()}
      </ul>
    </header>
  );
};
export default Header;
