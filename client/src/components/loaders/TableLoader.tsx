import { Skeleton } from "../ui/skeleton";

const TableLoader = () => {
  return (
    <>
      {new Array(5).fill(0).map((_, i) => (
        <tr key={i}>
          <Skeleton className="mb-4 h-12" />
        </tr>
      ))}
    </>
  );
};
export default TableLoader;
