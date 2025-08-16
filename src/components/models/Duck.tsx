import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3, Group } from "three";

interface DuckProps {
  scale?: number;
  position?: [number, number, number];
  onLoad?: () => void;
}

export function Duck({ scale = 1, position = [0, 0, 0], onLoad }: DuckProps) {
  const { scene } = useGLTF("/models/duck/scene.gltf") as {
    scene: Group;
  };

  useEffect(() => {
    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());

    scene.position.sub(center);
    scene.position.y += size.y / 2;

    scene.scale.multiplyScalar(1.5 / Math.max(size.x, size.y, size.z));

    if (onLoad) onLoad();
  }, [scene, onLoad]);

  return <primitive object={scene} scale={scale} position={position} />;
}

useGLTF.preload("/models/duck/scene.gltf");