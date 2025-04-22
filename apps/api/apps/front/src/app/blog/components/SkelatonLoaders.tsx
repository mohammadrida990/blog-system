import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonLoaders() {
  return (
    <div className="gap-2 space-x-4  shadow rounded p-2 flex flex-col">
      <div className="space-y-2 flex items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />

        <Skeleton className="h-4 w-[250px]" />
      </div>

      <Skeleton className="h-4 w-[200px]" />
    </div>
  );
}
