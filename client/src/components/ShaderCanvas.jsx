import React from "react";
import { Canvas } from "@react-three/fiber";
import AuroraScene from "./AuroraScene";

export default function ShaderCanvas({
  vertex,
  fragment,
  lowerPhaseHue,
  upperPhaseHue,
  staticScene,
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ width: "100vw", height: "100vh" }}
      gl={{ alpha: false }}
    >
      <AuroraScene
        vertex={vertex}
        fragment={fragment}
        lowerPhaseHue={lowerPhaseHue}
        upperPhaseHue={upperPhaseHue}
        // staticScene={staticScene}
      />
    </Canvas>
  );
}
