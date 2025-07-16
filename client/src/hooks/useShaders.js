import { useState, useEffect } from "react";
import axios from "axios";

export function useShaders() {
  const [vertex, setVertex] = useState("");
  const [fragment, setFragment] = useState("");

  useEffect(() => {
    axios
      .get("/shader/vertexShader.glsl")
      .then((res) => setVertex(res.data))
      .catch((err) => console.error("Error loading vertex shader:", err));
    axios
      .get("/shader/auroraFragment.glsl")
      .then((res) => setFragment(res.data))
      .catch((err) => console.error("Error loading fragment shader:", err));
  }, []);

  return { vertex, fragment };
}
