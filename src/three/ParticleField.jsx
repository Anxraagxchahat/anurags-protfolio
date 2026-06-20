// ============================================================
// ParticleField — the drifting multiverse motes (doc 02 §6, doc 04 §5).
// One BufferGeometry of Points (never thousands of meshes). Maath inSphere for
// distribution. Tinted toward the live world accent each frame. Parallax by
// scroll + pointer. `animate=false` (reduced-motion) → static, still visible.
//
// Perf rules honored: no per-frame allocations (reused color/vector), no React
// state per frame, single geometry updated via transform/uniform only.
// ============================================================

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';
import { sceneState } from './sceneController';

const WHITE = new THREE.Color('#ffffff');
const _color = new THREE.Color();

export default function ParticleField({ count = 6000, radius = 9, size = 0.025, animate = true }) {
  const groupRef = useRef(null);
  const pointsRef = useRef(null);

  // Distribute once; guard against the rare NaN maath can emit.
  const positions = useMemo(() => {
    const arr = inSphere(new Float32Array(count * 3), { radius });
    for (let i = 0; i < arr.length; i++) {
      if (!Number.isFinite(arr[i])) arr[i] = 0;
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const dt = Math.min(delta, 0.1);

    if (animate) {
      g.rotation.y += dt * 0.02;
      g.rotation.x += dt * 0.008;
    }

    // Parallax: depth shift with scroll + subtle pointer lean
    g.position.z = sceneState.scrollProgress * 3;
    g.position.x = THREE.MathUtils.damp(g.position.x, sceneState.pointer.x * 0.6, 4, dt);
    g.position.y = THREE.MathUtils.damp(g.position.y, sceneState.pointer.y * 0.4, 4, dt);

    // Tint toward the active section accent (pale, never garish)
    const mat = pointsRef.current && pointsRef.current.material;
    if (mat) {
      _color.copy(sceneState.accent).lerp(WHITE, 0.55);
      mat.color.copy(_color);
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={size}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
