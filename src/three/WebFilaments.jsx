// ============================================================
// WebFilaments — faint thread strands echoing the spider-web motif (doc 02 §6).
// Cheap LineSegments (one geometry), accent-tinted, slow drift + scroll lean.
// Omitted entirely on mobile/lowPower (the World decides whether to mount it).
// ============================================================

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { sceneState } from './sceneController';

const WHITE = new THREE.Color('#ffffff');
const _color = new THREE.Color();

export default function WebFilaments({ count = 36, radius = 7, animate = true }) {
  const groupRef = useRef(null);
  const matRef = useRef(null);

  // Build random segment pairs once (2 vertices per segment)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 2 * 3);
    for (let i = 0; i < count; i++) {
      const ax = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const ay = (Math.sin(i * 78.233) * 43758.5453) % 1;
      const az = (Math.sin(i * 37.719) * 43758.5453) % 1;
      // Deterministic-ish pseudo-random direction (no Math.random for stability)
      const theta = ax * Math.PI * 2;
      const phi = ay * Math.PI;
      const len = 1.5 + Math.abs(az) * 2.5;
      const cx = (ax - 0.5) * radius;
      const cy = (ay - 0.5) * radius;
      const cz = (az - 0.5) * radius;
      const dx = Math.sin(phi) * Math.cos(theta) * len;
      const dy = Math.sin(phi) * Math.sin(theta) * len;
      const dz = Math.cos(phi) * len;
      const o = i * 6;
      arr[o] = cx; arr[o + 1] = cy; arr[o + 2] = cz;
      arr[o + 3] = cx + dx; arr[o + 4] = cy + dy; arr[o + 5] = cz + dz;
    }
    return arr;
  }, [count, radius]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const dt = Math.min(delta, 0.1);
    if (animate) {
      g.rotation.y -= dt * 0.015;
      g.rotation.z += dt * 0.005;
    }
    g.position.z = sceneState.scrollProgress * 1.5;
    if (matRef.current) {
      _color.copy(sceneState.accent).lerp(WHITE, 0.3);
      matRef.current.color.copy(_color);
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          ref={matRef}
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
