import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Box3, Vector3, Group } from "three";

interface DuckProps {
  scale?: number;
  position?: [number, number, number];
  onLoad?: () => void;
  rotationSpeed?: number; // New prop to control spin speed
}

export function ContactDuck({ 
  scale = 1, 
  position = [0, 0, 0], 
  onLoad,
  rotationSpeed = 1 
}: DuckProps) {
  const { scene } = useGLTF("/models/ContactDuck/ContactDuck.glb") as {
    scene: Group;
  };
  
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());

    scene.position.sub(center);
    scene.position.y += size.y / 2;

    scene.scale.multiplyScalar(1.5 / Math.max(size.x, size.y, size.z));

    if (onLoad) onLoad();
  }, [scene, onLoad]);

  // Animation frame hook for smooth spinning
  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={position}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/ContactDuck/ContactDuck.glb");