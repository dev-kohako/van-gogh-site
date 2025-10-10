"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PaintingPageSkeleton() {
  return (
    <main className="relative px-[7.5%] md:px-[5%] min-[1350px]:!px-0 my-20 md:my-14 w-full max-w-7xl flex justify-center flex-col items-center sm:ml-[7.5%]">
      <header className="mb-16 w-full text-center md:text-left">
        <Skeleton className="h-16 w-3/4 md:w-1/2 mx-auto md:mx-0" />
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
        <div className="w-full max-w-full mx-auto">
          <Skeleton className="w-full h-[550px] rounded-2xl" />
          <Skeleton className="h-4 w-3/4 mt-3 mx-auto" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-2/3" />
          <div className="pt-6 mt-6 border-t">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full mt-2" />
            <Skeleton className="h-5 w-3/4 mt-2" />
          </div>
          <div className="grid grid-cols-5 gap-2 pt-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-14 w-14 rounded-full" />
          </div>
        </div>
      </section>
    </main>
  );
}