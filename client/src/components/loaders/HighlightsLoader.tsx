import { Skeleton } from "../ui/skeleton";

const HighlightsLoader = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="relative h-64">
        <Skeleton className="absolute left-4 top-4 h-16 w-20">
          <Skeleton className="h-4 w-16 rounded-md" />
        </Skeleton>
      </Skeleton>
      {/* <Skeleton /> */}
      <Skeleton className="h-[9px] w-40" />
    </div>
  );
};
export default HighlightsLoader;
