import { cn } from "@/lib/utils"

function Skeleton({
	children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800", className)}
      {...props}
		>{children}</div>
  )
}

export { Skeleton }
