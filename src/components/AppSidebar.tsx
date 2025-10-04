"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "@/components/toggleDarkMode";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import logo from "../../public/assets/logo.png";
import { links } from "../../public/data/links";

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 fixed w-full">
        <div className="w-full flex flex-col flex-1 justify-between overflow-y-auto overflow-x-hidden">
          <section>
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
              {links.map((link) => (
                <SidebarLink key={crypto.randomUUID()} link={link} />
              ))}
            </nav>
          </section>
          <div className="flex flex-col items-start gap-2 relative">
            <SidebarLink
              link={{
                label: `© ${new Date().getFullYear()} KWK Tech`,
                icon: <ModeToggle />,
                href: "#",
              }}
            />
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
