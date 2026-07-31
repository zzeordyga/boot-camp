import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="flex flex-col gap-5 items-center text-center justify-center" key={index}>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
