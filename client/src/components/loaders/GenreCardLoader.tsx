import { Skeleton } from "../ui/skeleton";

const GenreCardLoader = () => {
  return (
    <>
      {new Array(5).fill(0).map((_, i) => (
        <div>
          <Skeleton key={i} className="relative size-48" />
        </div>
      ))}
    </>
  );
};
export default GenreCardLoader;
