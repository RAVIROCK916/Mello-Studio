import { Skeleton } from "../ui/skeleton";

const ArtistCardLoader = () => {
  return (
    <>
      {new Array(5).fill(0).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="size-48"></Skeleton>
          <Skeleton className="h-6 w-32"></Skeleton>
        </div>
      ))}
    </>
  );
};
export default ArtistCardLoader;
