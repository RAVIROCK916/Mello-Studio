import { Link } from "react-router-dom";
import Logo from "./Logo";
import { MdLogin, MdNotificationsNone, MdOutlineSettings, MdPerson } from "react-icons/md";
import { UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const user = useUser();
  const listItemStyle =
    "flex items-center font-semibold gap-1 cursor-pointer hover:text-black-variant-2/70";
  const iconItemStyle = "flex items-center gap-1 text-lg text-black-variant-2 bg-neutral-200 rounded-full p-1.5 cursor-pointer hover:text-black-variant-2/70";
  const renderContent = () => {
    if (user.isSignedIn) {
      return (
        <div className="flex items-center gap-6">
          <li className={iconItemStyle}>
            <MdNotificationsNone /> 
          </li>
          <li className={iconItemStyle}>
            <MdOutlineSettings />
          </li>
          <li className={listItemStyle}>
            <UserButton afterSignOutUrl="/login" />
          </li>
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
    <header className="flex items-center justify-between mb-10">
      <Logo />
      <ul className="flex gap-8 text-sm tracking-wide text-black-variant-2">
        {renderContent()}
      </ul>
    </header>
  );
};
export default Header;
