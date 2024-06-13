import { FaCircleChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();
  return (
    <FaCircleChevronLeft
      className="size-8 cursor-pointer text-neutral-200 transition-colors hover:text-neutral-300 dark:text-neutral-800 dark:hover:text-neutral-700"
      onClick={() => navigate(-1)}
    />
  );
};
export default GoBack;
