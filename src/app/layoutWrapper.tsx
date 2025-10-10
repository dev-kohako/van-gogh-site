"use client";

import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/sonner";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar />
      <main className="flex-1 flex justify-center items-center w-full font-josefin">
        {children}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
