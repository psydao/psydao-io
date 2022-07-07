import { useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Curve: THREE.Mesh;
  };
  materials: {};
};

const Model = () => {
  const meshRef = useRef<Mesh>(null);
  const { nodes } = useGLTF("/psydao-logo.glb") as GLTFResult;

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.z = elapsedTime / 4;
    }
  });

  return (
    <mesh
      ref={meshRef}
      castShadow
      receiveShadow
      geometry={nodes.Curve.geometry}
      material={nodes.Curve.material}
      rotation={[0.2618, 0, 0]}
    />
  );
};

useGLTF.preload("/psydao-logo.glb");

export const Logo = () => {
  return (
    <Canvas camera={{ position: [0, 0.1, 0], near: 0.01 }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <Model />
    </Canvas>
  );
};
