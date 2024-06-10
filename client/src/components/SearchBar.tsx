import { useSearchStore } from "@/store/searchStore";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch } = useSearchStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!location.pathname.startsWith("/dashboard/search")) {
      navigate("/dashboard/search", { state: { q: search } });
    }
  };
  return (
    <div className="relative">
      <MdSearch className="absolute right-[2%] top-[50%] -translate-y-1/2 transform cursor-pointer text-lg" />
      <input
        type="text"
        placeholder="Search"
        className="w-96 rounded-md bg-neutral-100 px-4 py-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={handleNavigate}
      />
    </div>
  );
};
export default SearchBar;
