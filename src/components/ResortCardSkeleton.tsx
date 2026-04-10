// @ts-nocheck
export default function ResortCardSkeleton() {
  return (
    <div className="relative group overflow-hidden rounded-[2.5rem] bg-navy-800 animate-pulse h-[450px]">
      <div className="absolute inset-0 bg-slate-700/20" />
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
        <div className="h-4 w-24 bg-slate-700/40 rounded-full" />
        <div className="h-8 w-48 bg-slate-700/40 rounded-lg" />
        <div className="h-4 w-full bg-slate-700/40 rounded-full" />
        <div className="flex gap-4 pt-4">
          <div className="h-10 w-full bg-slate-700/40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}