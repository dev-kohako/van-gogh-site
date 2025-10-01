import { Links } from "@/types/types";
import { Home, Images, Palette, User } from "lucide-react";

const iconClasses = "h-5 w-5 shrink-0 text-foreground";



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
