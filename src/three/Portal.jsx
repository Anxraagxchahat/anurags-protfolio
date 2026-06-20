// ============================================================
// Portal — the rotating rift disc (doc 01 §4, doc 02 §6). The single most
// "Spider-Verse" 3D element: a shader-driven swirl with a chromatic rim that
// FLARES on portal crossings (sceneState.portalFlare). Abstract/dimensional —
// no character silhouettes.
//
// One ShaderMaterial, uniforms updated in-place each frame (no allocations).
// `animate=false` (reduced-motion) freezes time → a still rift, still on-brand.
// ============================================================

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { sceneState } from './sceneController';
import { COLORS } from '../lib/theme';

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uFlare;
  uniform vec3 uColorA; // electric blue
  uniform vec3 uColorB; // violet
  uniform vec3 uColorC; // accent (section-driven)
  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p) * 2.0;        // 0 center → 1 edge
    float a = atan(p.y, p.x);

    // Swirling comic energy
    float swirl = sin(a * 6.0 + uTime * 1.5 - r * 8.0);
    float swirlGlow = 0.5 + 0.5 * swirl;

    // Portal gradient: blue core → violet → accent rim
    vec3 col = mix(uColorA, uColorB, smoothstep(0.0, 0.5, r));
    col = mix(col, uColorC, smoothstep(0.5, 0.9, r));

    // Chromatic rim ring
    float rim = smoothstep(0.74, 0.92, r) * (1.0 - smoothstep(0.92, 1.04, r));

    float core = smoothstep(0.0, 0.22, r);     // hollow center
    float edgeFade = 1.0 - smoothstep(0.86, 1.0, r);

    float alpha = edgeFade * core * (0.30 + 0.65 * swirlGlow);
    alpha += rim * (0.6 + uFlare);

    col += rim * uColorC * (0.5 + uFlare * 1.5);
    col *= (1.0 + uFlare * 0.8);

    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

export default function Portal({ scale = 7, position = [0, 0, -4], animate = true }) {
  const meshRef = useRef(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uFlare: { value: 0 },
          uColorA: { value: new THREE.Color(COLORS.spiderBlue) },
          uColorB: { value: new THREE.Color(COLORS.spiderViolet) },
          uColorC: { value: new THREE.Color(COLORS.spiderRed) },
        },
      }),
    [],
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const u = material.uniforms;
    if (animate) {
      u.uTime.value += dt;
      if (meshRef.current) meshRef.current.rotation.z += dt * 0.04;
    }
    u.uFlare.value = sceneState.portalFlare;
    u.uColorC.value.copy(sceneState.accent);
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} material={material}>
      <planeGeometry args={[1, 1, 1, 1]} />
    </mesh>
  );
}
