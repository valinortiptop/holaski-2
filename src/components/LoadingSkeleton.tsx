// src/components/LoadingSkeleton.tsx
export function CardSkeleton() {
  return (
    <div className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-white/10" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-1/2" />
        <div className="h-4 bg-white/10 rounded w-full" />
      </div>
    </div>
  );
}
export function PageSkeleton() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-white/10 rounded w-1/3" />
        <div className="h-5 bg-white/10 rounded w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      </div>
    </div>
  );
}