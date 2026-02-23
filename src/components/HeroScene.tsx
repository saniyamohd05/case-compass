import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function GlassCard({ position, rotation, scale = 1, color = "#8B6914" }: { position: [number, number, number]; rotation: [number, number, number]; scale?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.x = rotation[0] + Math.cos(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[2, 1.2, 0.05]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#D4A537" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#A67C1A" />
      <GlassCard position={[-1.5, 0.5, 0]} rotation={[0.2, 0.3, 0]} color="#8B6914" />
      <GlassCard position={[1.5, -0.3, -1]} rotation={[-0.1, -0.4, 0]} scale={0.8} color="#A67C1A" />
      <GlassCard position={[0, 0.8, -2]} rotation={[0.1, 0.2, 0]} scale={0.6} color="#D4A537" />
    </>
  );
}

const HeroScene = () => {
  return (
    <div className="absolute inset-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroScene;
