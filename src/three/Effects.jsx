// ============================================================
// Effects — restrained post FX (doc 02 §6, doc 04 §5 budget).
//   desktop → bloom + chromatic aberration (tiny) + vignette
//   tablet  → bloom + vignette (no CA)
//   mobile  → none (component not mounted by World)
// High bloom threshold so glints stay glints and text never washes out.
// ============================================================

import { useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';

export default function Effects({ tier = 'desktop' }) {
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0006), []);

  if (tier === 'mobile') return null;

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.62}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      {tier === 'desktop' && (
        <ChromaticAberration offset={caOffset} radialModulation={false} modulationOffset={0} />
      )}
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
    </EffectComposer>
  );
}
