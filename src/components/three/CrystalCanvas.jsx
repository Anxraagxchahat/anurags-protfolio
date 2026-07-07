import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Float, MeshTransmissionMaterial, AdaptiveDpr } from '@react-three/drei';
import { easing } from 'maath';
import * as THREE from 'three';

/**
 * The signature hero object: a floating faceted crystal in a bright studio
 * environment. Self-contained lighting (Lightformers, no external HDRI, no
 * postprocessing), pointer parallax, and gentle idle drift.
 *
 * Perf posture: transparent canvas, DPR capped, modest transmission
 * samples/resolution, rendering paused when scrolled offscreen or the tab is
 * hidden, no per-frame allocations. Lazy-loaded so Three never blocks paint.
 */

function Crystal({ pointer, reduced }) {
  const group = useRef();
  const mesh = useRef();

  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return;

    mesh.current.rotation.y += delta * (reduced ? 0 : 0.12);
    mesh.current.rotation.z += delta * (reduced ? 0 : 0.02);

    const tiltX = pointer.current.y * 0.28;
    const tiltY = pointer.current.x * 0.4;
    easing.dampE(group.current.rotation, [tiltX, tiltY, 0], 0.55, delta);
    easing.damp3(
      group.current.position,
      [pointer.current.x * 0.25, pointer.current.y * 0.2, 0],
      0.5,
      delta
    );
  });

  return (
    <group ref={group}>
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.35}
        floatIntensity={reduced ? 0 : 0.7}
        floatingRange={[-0.12, 0.12]}
      >
        <mesh ref={mesh} scale={[0.92, 1.28, 0.92]}>
          <icosahedronGeometry args={[1.15, 0]} />
          <MeshTransmissionMaterial
            samples={4}
            resolution={224}
            transmission={1}
            thickness={1.1}
            roughness={0.04}
            ior={1.42}
            chromaticAberration={0.06}
            anisotropicBlur={0.1}
            distortion={0.15}
            distortionScale={0.3}
            temporalDistortion={reduced ? 0 : 0.08}
            clearcoat={1}
            clearcoatRoughness={0.05}
            attenuationDistance={2}
            attenuationColor="#eef0ff"
            color="#f3f2ff"
            background={new THREE.Color('#f6f7fc')}
            flatShading
          />
        </mesh>

        <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[2.05, 0.02, 16, 120]} />
          <meshStandardMaterial
            color="#8A7CFF"
            emissive="#8A7CFF"
            emissiveIntensity={0.35}
            roughness={0.4}
            metalness={0.1}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

function StudioEnv() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#0e0e14']} />
      <Lightformer intensity={2.2} position={[0, 3, 3]} scale={[6, 6, 1]} color="#ffffff" />
      <Lightformer intensity={1.6} position={[-4, 1, 2]} scale={[3, 6, 1]} color="#8A7CFF" />
      <Lightformer intensity={1.6} position={[4, -1, 2]} scale={[3, 6, 1]} color="#5FD0E6" />
      <Lightformer intensity={1.1} position={[2, 3, -2]} scale={[4, 4, 1]} color="#F58EC1" />
      <Lightformer intensity={1.3} position={[0, -3, 1]} scale={[6, 2, 1]} color="#4F86F7" />
    </Environment>
  );
}

export default function CrystalCanvas({ reduced = false }) {
  const wrapRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;

    let onScreen = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        setActive(onScreen && !document.hidden);
      },
      { rootMargin: '120px' }
    );
    io.observe(el);

    const onVis = () => setActive(onScreen && !document.hidden);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        className="!absolute inset-0"
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={active ? 'always' : 'never'}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <Crystal pointer={pointer} reduced={reduced} />
        <StudioEnv />
        <AdaptiveDpr pixelated={false} />
      </Canvas>
    </div>
  );
}
