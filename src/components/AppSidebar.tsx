"use client";

import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/toggleDarkMode";
import { links } from "../../public/data/links";
import logo from "../../public/assets/logo.png";
import { motion } from "motion/react";
import Link from "next/link";
import { AppSidebarProps } from "@/types/types";

export function AppSidebar({ open, setOpen }: AppSidebarProps) {
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody
        role="navigation"
        aria-label="Menu lateral"
        className="absolute flex flex-col justify-between w-full min-h-screen gap-10 border-r bg-background dark:bg-background"
      >
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Link
            href="/"
            aria-label="Página inicial da KWK Tech"
            className="relative z-20 flex items-center space-x-2 py-2"
          >
            <Image
              src={logo}
              width={24}
              height={24}
              priority
              alt="Logo da KWK Tech"
              className="object-contain invert dark:invert-0"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-1 text-base font-medium whitespace-pre text-foreground"
            >
              KWK Tech
            </motion.span>
          </Link>

          <nav
            className="mt-10 flex flex-col gap-2"
            aria-label="Links principais"
          >
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-2">
          <SidebarLink
            link={{
              label: `© ${new Date().getFullYear()} KWK Tech`,
              icon: <ModeToggle />,
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
