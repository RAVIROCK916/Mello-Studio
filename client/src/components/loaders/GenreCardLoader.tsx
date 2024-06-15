import { Skeleton } from "../ui/skeleton";

const GenreCardLoader = () => {
  return (
    <>
      {new Array(5).fill(0).map((_, i) => (
        <div key={i}>
          <Skeleton className="relative size-48" />
        </div>
      ))}
    </>
  );
};
export default GenreCardLoader;
