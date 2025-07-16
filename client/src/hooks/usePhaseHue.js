import { useState, useEffect } from "react";

// Converts "#RRGGBB" to a [0,1] hue
function hexToHue(hex) {
	// Remove the hash if present
	hex = hex.replace(/^#/, '');
	if (hex.length !== 6) {
		throw new Error('Only full hex colors are supported, e.g., #C6D826');
	}
	const r = parseInt(hex.slice(0, 2), 16) / 255;
	const g = parseInt(hex.slice(2, 4), 16) / 255;
	const b = parseInt(hex.slice(4, 6), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const delta = max - min;

	let hue;
	if (delta === 0) {
		hue = 0;
	} else if (max === r) {
		hue = ((g - b) / delta) % 6;
	} else if (max === g) {
		hue = (b - r) / delta + 2;
	} else { // max === b
		hue = (r - g) / delta + 4;
	}
	hue = hue * 60; // Convert to degrees
	if (hue < 0) hue += 360;
	return hue / 360; // Normalize to [0, 1]
}

export function usePhaseHue(initialLowerColor, initialUpperColor) {
  const [lowerColor, setLowerColor] = useState(initialLowerColor);
  const [upperColor, setUpperColor] = useState(initialUpperColor);
  const [lowerPhaseHue, setLowerPhaseHue] = useState(hexToHue(initialLowerColor));
  const [upperPhaseHue, setUpperPhaseHue] = useState(hexToHue(initialUpperColor));

  useEffect(() => {
	setLowerPhaseHue(hexToHue(lowerColor));
	setUpperPhaseHue(hexToHue(upperColor));
  }, [lowerColor, upperColor]);

  return { lowerPhaseHue, upperPhaseHue, setLowerColor, setUpperColor };
}