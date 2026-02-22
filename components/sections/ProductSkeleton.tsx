import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <div className="card-neon overflow-hidden flex flex-col bg-muted/20">
            {/* Image Skeleton */}
            <Skeleton className="aspect-[4/3] w-full rounded-none" />

            {/* Body Skeleton */}
            <div className="p-5 flex flex-col gap-3 flex-1">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}
