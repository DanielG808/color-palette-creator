"use client";

import { useState } from "react";
import ColorChip from "./color-chip";
import PlusButton from "./plus-button";

export default function ColorPalette() {
  const [numColors, setNumColors] = useState(3);

  function addColorChip() {
    if (numColors >= 5) return;
    setNumColors(numColors + 1);
  }

  return (
    <div className="flex space-x-8">
      {Array.from({ length: numColors }).map((_, index) => (
        <ColorChip key={index} />
      ))}

      {numColors < 5 && <PlusButton onClick={addColorChip} />}
    </div>
  );
}
