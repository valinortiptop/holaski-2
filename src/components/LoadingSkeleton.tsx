// @ts-nocheck
// src/components/LoadingSkeleton.tsx
export function CardSkeleton() {
  return (
    <div className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-1/2" />
        <div className="h-4 bg-white/10 rounded w-full" />
      </div>
    </div>
  );
}

export function PackageSkeleton() {
  return (
    <div className="bg-white/5 rounded-2xl p-6 animate-pulse space-y-4 border border-white/10">
      <div className="h-6 bg-white/10 rounded w-1/2" />
      <div className="h-4 bg-white/10 rounded w-3/4" />
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-white/10 rounded" />)}
      </div>
      <div className="h-10 bg-white/10 rounded-xl" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 animate-pulse">
      <div className="h-10 bg-white/10 rounded w-1/3 mx-auto" />
      <div className="h-5 bg-white/10 rounded w-1/2 mx-auto" />
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );
}