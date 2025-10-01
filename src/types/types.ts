import { Dispatch, SetStateAction } from "react";

export interface Paiting {
  id: string;
  namePainting: string;
  originalTittle: string;
  datePainting: string;
  imagePainting: string;
  style: string;
  materials: string;
  local: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
}

export interface SwiperPainting {
  src: string;
  alt: string;
}

export interface AppSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface PaintingCarouselProps {
  paintings: SwiperPainting[];
}

export interface Links {
  label: string;
  href: string;
  icon?: React.JSX.Element | React.ReactNode;
}

export interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}