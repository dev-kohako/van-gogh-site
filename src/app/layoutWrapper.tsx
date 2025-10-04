"use client";

import { AppSidebar } from "@/components/AppSidebar";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 flex justify-center items-center w-full font-josefin">
        {children}
      </main>
    </div>
  );
}
