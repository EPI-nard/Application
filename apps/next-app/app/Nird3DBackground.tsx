"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { Suspense, useRef } from "react";
import * as THREE from "three";

function NirdLogo(props: JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/NIRD_LOGO_3D.glb");
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      // Rotation très lente et fluide
      ref.current.rotation.y = t * 0.12;
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
  });

  return (
    <group ref={ref} {...props}>
      <primitive object={scene} />
    </group>
  );
}

// Préchargement pour éviter les flashs
useGLTF.preload("/models/NIRD_LOGO_3D.glb");

export default function Nird3DBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0, // derrière le contenu
        pointerEvents: "none", // ne bloque pas les clics
        opacity: 0.22, // très discret
        mixBlendMode: "screen", // joli fondu sur ton fond violet
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Très léger blur / lumière d’ambiance */}
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={0.8} />
        <directionalLight position={[-4, -3, -5]} intensity={0.3} />

        <Suspense fallback={null}>
          <NirdLogo position={[0, -0.5, 0]} />
        </Suspense>

        {/* Contrôles désactivés pour l’utilisateur, mais utiles en dev */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
