import { useSearchStore } from "@/store/searchStore";
import { MdSearch } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "./GoBack";

const SearchBar = () => {
  const { search, setSearch } = useSearchStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!location.pathname.startsWith("/dashboard/search")) {
      navigate("/dashboard/search", { state: { q: search } });
    }
  };
  return (
    <div className="flex flex-1 flex-row-reverse items-center justify-between gap-4">
      <label className="relative">
        <MdSearch className="absolute left-[3%] top-[50%] -translate-y-1/2 transform cursor-pointer text-lg" />
        <input
          type="text"
          placeholder="Search"
          className="w-96 rounded-md bg-neutral-100 px-4 py-2 pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={handleNavigate}
        />
      </label>
      {!(pathname === "/") && <GoBack />}
    </div>
  );
};
export default SearchBar;
