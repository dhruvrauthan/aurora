import React, { useState, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const AuroraScene = ({ vertex, fragment, lowerPhaseHue, upperPhaseHue, staticScene = false }) => {
  const meshRef = useRef();

  // Load noise texture (make sure the path is correct)
  const noiseTexture = useTexture("/shader/noise2.png");
  const { viewport, mouse } = useThree();
  const [interactive, setInteractive] = useState(true);

  const width = viewport.width;
  const height = viewport.height;

  // Expose the mesh globally if needed for debugging
  useEffect(() => {
    window.auroraMesh = meshRef.current;
  }, []);

  // Define shader uniforms
  const uniforms = useMemo(
    () => ({
      iTime: { type: "f", value: 1.0 },
      iResolution: {
        type: "v2",
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      iMouse: { type: "v2", value: new THREE.Vector2(0, 0) },
      iChannel0: { type: "t", value: noiseTexture },
      phaseOffset: {
        type: "v3",
        value: new THREE.Vector3(2.15, -0.5, 1.2),
      },
      lowerPhaseHue: { type: "f", value: lowerPhaseHue },
      upperPhaseHue: { type: "f", value: upperPhaseHue },
    }),
    [noiseTexture]
  );

  // Update the phaseHue uniform when it changes
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.lowerPhaseHue.value = lowerPhaseHue;
      meshRef.current.material.uniforms.upperPhaseHue.value = upperPhaseHue;
    }
  }, [lowerPhaseHue, upperPhaseHue]);

  ////////// remove to be able to move around the aurora
  // useEffect(() => {
  //   const handleGlobalMouseMove = (event) => {
  //     uniforms.iMouse.value.set(
  //       event.clientX,
  //       window.innerHeight - event.clientY
  //     );
  //   };

  //   window.addEventListener("mousemove", handleGlobalMouseMove);
  //   return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  // }, [uniforms]);

  // Update time uniform on each frame
  useFrame((state) => {
    if (!staticScene && meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.material.uniforms.iTime.value = time + 20;
    }
  });

  // Update mouse uniform on pointer move
  const handlePointerMove = (event) => {
    if (!staticScene) {
      uniforms.iMouse.value.set(
        event.clientX,
        window.innerHeight - event.clientY
      );
    }
  };

  return (
    ////////// remove to be able to move around the aurora
    // <mesh ref={meshRef} onPointerMove={handlePointerMove}>
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default AuroraScene;