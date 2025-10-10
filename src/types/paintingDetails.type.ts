import { Vector3 } from "three";
import { Painting } from "./types";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type PaintingLink = { id: string | number } | undefined;

export interface FullscreenImageViewerProps {
  painting: Painting;
  onClose: () => void;
}

export interface Painting3DViewerProps {
  imageUrl: string;
  title: string;
  width: number;
  height: number;
  onClose: () => void;
}

export interface FramedPaintingProps {
  imageUrl: string;
  width: number;
  height: number;
  scaledWidth: number;
  scaledHeight: number;
}

export interface GalleryPlaqueProps {
  width: number;
  height: number;
}
export interface PaintingHeaderProps {
  painting: Painting;
}

export interface SceneSetupAndAnimationProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  targetPosition: Vector3;
}

export interface FrameBackProps {
  frameWidth: number;
  frameHeight: number;
  frameDepth: number;
}

export interface PaintingImageProps {
  painting: Painting;
  prevPainting: PaintingLink;
  nextPainting: PaintingLink;
  onShow3D: () => void;
  onOpenFullscreen: () => void;
}

export interface PaintingNavigationProps {
  prevPainting: PaintingLink;
  nextPainting: PaintingLink;
}

export interface PaletteProps {
  colors: string[];
}

export interface PaintingDetailsProps {
  painting: Painting;
}