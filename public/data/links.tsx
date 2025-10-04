import { Home, Images, Palette, User } from "lucide-react";
import type { Links } from "@/types/types";

const iconClasses = "h-6 w-6 shrink-0 text-foreground";

export const links: Links[] = [
  {
    label: "Início",
    href: "/",
    icon: <Home className={iconClasses} />,
  },
  {
    label: "Galeria",
    href: "/gallery",
    icon: <Images className={iconClasses} />,
  },
  {
    label: "Pinturas",
    href: "/paintings",
    icon: <Palette className={iconClasses} />,
  },
  {
    label: "Sobre",
    href: "/about",
    icon: <User className={iconClasses} />,
  },
];
