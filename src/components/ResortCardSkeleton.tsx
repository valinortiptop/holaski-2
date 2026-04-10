// @ts-nocheck
import { memo } from 'react';

const ResortCardSkeleton = memo(function ResortCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-navy-800 animate-pulse h-[480px]">
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-800/40 to-navy-800/20" />
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
        <div className="h-4 w-24 bg-slate-700/50 rounded-full" />
        <div className="h-10 w-48 bg-slate-700/50 rounded-lg" />
        <div className="grid grid-cols-3 gap-3 pt-3">
          <div className="h-16 bg-slate-700/30 rounded-2xl" />
          <div className="h-16 bg-slate-700/30 rounded-2xl" />
          <div className="h-16 bg-slate-700/30 rounded-2xl" />
        </div>
        <div className="h-12 w-32 bg-slate-700/50 rounded-xl" />
      </div>
    </div>
  );
});

export default ResortCardSkeleton;