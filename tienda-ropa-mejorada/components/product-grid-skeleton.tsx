import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductGridSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-[3/4] w-full" />
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
