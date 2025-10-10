"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  useTexture,
  Text3D,
  Center,
  Plane,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  FrameBackProps,
  FramedPaintingProps,
  GalleryPlaqueProps,
  Painting3DViewerProps,
  SceneSetupAndAnimationProps,
} from "@/types/paintingDetails.type";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

function FrameBack({ frameWidth, frameHeight, frameDepth }: FrameBackProps) {
  return (
    <group rotation={[0, Math.PI, 0]} position-z={-frameDepth / 2}>
      <mesh>
        <boxGeometry args={[frameWidth, frameHeight, 0.02]} />
        <meshStandardMaterial color="#4a3c30" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function GalleryPlaque({ width, height }: GalleryPlaqueProps) {
  return (
    <group>
      <Center position={[0, 0, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.12}
          height={0.03}
          bevelEnabled
          bevelThickness={0.008}
          bevelSize={0.004}
          bevelSegments={4}
        >
          {`${width}cm x ${height}cm`}
          <meshStandardMaterial
            color="#cccccc"
            metalness={0.4}
            roughness={0.5}
          />
        </Text3D>
      </Center>
    </group>
  );
}

function FramedPainting({
  imageUrl,
  width,
  height,
  scaledWidth,
  scaledHeight,
}: FramedPaintingProps) {
  const [woodTexture, normalMap, roughnessMap] = useTexture([
    "/textures/fine_grained_wood_col_8k.png",
    "/textures/fine_grained_wood_nor_gl_8k.png",
    "/textures/fine_grained_wood_rough_8k.png",
  ]);

  [woodTexture, normalMap, roughnessMap].forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  });

  const texture = useTexture(imageUrl);

  const frameThickness = scaledWidth * 0.05;
  const paintingDepth = 0.05;
  const glassThickness = 0.05;
  const frameDepth = 0.2;
  const plaqueYPosition = -scaledHeight / 2 - frameThickness - 0.3;
  const plaqueScale = Math.min(scaledWidth / 3, 0.8);

  return (
    <group>
      <group castShadow>
        <mesh position={[0, 0, paintingDepth / 2 + glassThickness / 2]}>
          <boxGeometry args={[scaledWidth, scaledHeight, glassThickness]} />
          <meshPhysicalMaterial
            transmission={0.97}
            thickness={0.1}
            roughness={0.02}
            ior={1.52}
            clearcoat={1}
            clearcoatRoughness={0.1}
            color="#e8f5e9"
          />
        </mesh>
        <mesh>
          <boxGeometry args={[scaledWidth, scaledHeight, paintingDepth]} />
          <meshStandardMaterial map={texture} side={THREE.FrontSide} />
        </mesh>
        {[
          { pos: [-scaledWidth / 2 - frameThickness / 2, 0], args: [frameThickness, scaledHeight + frameThickness * 2, frameDepth] },
          { pos: [scaledWidth / 2 + frameThickness / 2, 0], args: [frameThickness, scaledHeight + frameThickness * 2, frameDepth] },
          { pos: [0, scaledHeight / 2 + frameThickness / 2], args: [scaledWidth, frameThickness, frameDepth] },
          { pos: [0, -scaledHeight / 2 - frameThickness / 2], args: [scaledWidth, frameThickness, frameDepth] },
        ].map((frame, index) => (
          <mesh
            key={index}
            position={[frame.pos[0], frame.pos[1], paintingDepth / 2]}
          >
            <boxGeometry args={frame.args as [number, number, number]} />
            <meshStandardMaterial
              map={woodTexture}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
              roughness={0.5}
              metalness={0}
            />
          </mesh>
        ))}
        <FrameBack
          frameWidth={scaledWidth}
          frameHeight={scaledHeight}
          frameDepth={frameDepth}
        />
      </group>
      <group position={[0, plaqueYPosition, 0]} scale={plaqueScale}>
        <GalleryPlaque width={width} height={height} />
      </group>
    </group>
  );
}

function SceneSetupAndAnimation({
  controlsRef,
  targetPosition,
}: SceneSetupAndAnimationProps) {
  const { camera } = useThree();
  const [isAnimating, setIsAnimating] = useState(true);

  const endPos = useMemo(
    () => new Vector3(targetPosition.x, targetPosition.y, 7),
    [targetPosition]
  );

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const handleInteraction = () => setIsAnimating(false);
    controls.addEventListener("start", handleInteraction);
    return () => controls.removeEventListener("start", handleInteraction);
  }, [controlsRef]);

  useFrame((_, delta) => {
    if (!isAnimating) return;
    camera.position.lerp(endPos, 2 * delta);
    if (camera.position.distanceTo(endPos) < 0.01) {
      camera.position.copy(endPos);
      setIsAnimating(false);
    }
  });

  return null;
}

function Scene({
  imageUrl,
  width,
  height,
}: Omit<Painting3DViewerProps, "onClose" | "title">) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { viewport, scene } = useThree();
  const aspectRatio = useMemo(() => width / height, [width, height]);

  const scale = Math.min(viewport.width * 0.4, viewport.height * 0.4);
  const scaledWidth = aspectRatio >= 1 ? scale : scale * aspectRatio;
  const scaledHeight = aspectRatio >= 1 ? scale / aspectRatio : scale;

  const groupYPosition = scaledHeight * 0.5 + 0.5;
  const targetPosition = useMemo(
    () => new Vector3(0, groupYPosition, 0),
    [groupYPosition]
  );

  useEffect(() => {
    const texture = new THREE.TextureLoader().load(imageUrl);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    return () => {
      scene.environment = null;
      texture.dispose();
    };
  }, [imageUrl, scene]);

  return (
    <>
      <fog attach="fog" args={["#101015", 10, 30]} />
      
      <ambientLight intensity={0.1} />
      <hemisphereLight intensity={0.2} color="#ffffff" groundColor="#444444" />
      <spotLight
        position={[0, 10, 10]}
        angle={0.4}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={2048}
      />

      <group position={targetPosition}>
        <FramedPainting
          imageUrl={imageUrl}
          width={width}
          height={height}
          scaledWidth={scaledWidth}
          scaledHeight={scaledHeight}
        />
      </group>

      {/* MUDANÇA: Plano de fundo para receber a sombra */}
      <Plane
        args={[30, 30]}
        position={[0, 0, -2]}
        rotation={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#101015" transparent opacity={0} />
      </Plane>

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={2}
        maxDistance={16}
        target={targetPosition}
      />
      <SceneSetupAndAnimation
        controlsRef={controlsRef}
        targetPosition={targetPosition}
      />
    </>
  );
}

export function Painting3DViewer({
  imageUrl,
  title,
  width,
  height,
  onClose,
}: Painting3DViewerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center cursor-grab active:cursor-grabbing bg-black/70 backdrop-blur-lg">
      <Canvas
        shadows
        camera={{ position: [0, 2, 12], fov: 50 }}
        dpr={[1, 2]}
        className="w-full h-fit"
      >
        <Suspense
          fallback={
            <Html center>
              <span className="text-white text-lg text-nowrap">
                Carregando obra...
              </span>
            </Html>
          }
        >
          <Scene
            imageUrl={imageUrl}
            width={width}
            height={height}
          />
        </Suspense>
      </Canvas>

      <Button
        className="absolute top-5 right-5 pb-1 text-zinc-50 hover:text-zinc-800 dark:text-zinc-50"
        onClick={onClose}
        aria-label="Close 3D viewer"
        variant="ghost"
        size="icon"
      >
        <X className="w-6 h-6" />
      </Button>
    </div>
  );
}