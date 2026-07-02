import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles, Trail, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ShaderPlane, EnergyRing } from './ui/background-paper-shaders';

// A rotating wireframe Icosahedron with glowing edges (glowing core crystal)
function CoreCrystal({ position = [0, 0, 0] }) {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.15;
      wireRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Core glowing solid */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <MeshDistortMaterial
          color="#e23636"
          emissive="#e23636"
          emissiveIntensity={0.3}
          roughness={0.5}
          metalness={0.8}
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Outer wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color="#0284c7"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// Orbiting floating 3D shapes 
function OrbitingShape({ radius, speed, offset, shape, color, size }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.position.y = Math.sin(t * 0.5) * 1.2;
      meshRef.current.rotation.x = t * 0.5;
      meshRef.current.rotation.z = t * 0.3;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'octahedron':
        return <octahedronGeometry args={[size, 0]} />;
      case 'torus':
        return <torusGeometry args={[size, size * 0.35, 8, 16]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[size, 0]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[size, 0]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[size * 0.6, size * 0.2, 64, 8]} />;
      default:
        return <boxGeometry args={[size, size, size]} />;
    }
  }, [shape, size]);

  return (
    <Trail
      width={0.3}
      length={6}
      color={new THREE.Color(color)}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef}>
        {geometry}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
    </Trail>
  );
}

// Floating particle cloud
function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const red = new THREE.Color('#e23636');
    const blue = new THREE.Color('#0284c7');
    for (let i = 0; i < count; i++) {
      const c = Math.random() > 0.5 ? red : blue;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, []);

  const pointsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.02;
      pointsRef.current.rotation.x = t * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// Grid floor with depth perspective
function DepthGrid() {
  const gridRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (gridRef.current) {
      gridRef.current.position.z = (t * 0.5) % 2;
    }
  });

  return (
    <group ref={gridRef}>
      <gridHelper
        args={[40, 40, '#e23636', '#0284c7']}
        position={[0, -4, 0]}
        rotation={[0, 0, 0]}
      >
        <meshBasicMaterial
          attach="material"
          color="#0284c7"
          transparent
          opacity={0.06}
        />
      </gridHelper>
    </group>
  );
}



// Camera mouse follow controller
function CameraController() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    mouse.current.x += (target.current.x - mouse.current.x) * 0.03;
    mouse.current.y += (target.current.y - mouse.current.y) * 0.03;

    camera.position.x = mouse.current.x * 1.5;
    camera.position.y = mouse.current.y * -0.8;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main 3D Hero scene
export default function HeroScene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} color="#0284c7" intensity={0.6} />
        <pointLight position={[-5, -3, 3]} color="#e23636" intensity={0.4} />
        <pointLight position={[0, 8, -5]} color="#38bdf8" intensity={0.3} />

        {/* Camera follow mouse */}
        <CameraController />

        {/* Central core crystal */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <CoreCrystal position={[3, 0.5, -2]} />
        </Float>

        {/* Advanced shader accents (components/ui/background-paper-shaders) */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.6}>
          <ShaderPlane position={[3, 0.5, -3]} color1="#e23636" color2="#0284c7" />
        </Float>
        <EnergyRing radius={2.6} position={[3, 0.5, -2.5]} color="#0284c7" />
        <EnergyRing radius={1.4} position={[3, 0.5, -2]} color="#e23636" />

        {/* Orbiting 3D geometric shapes */}
        <OrbitingShape radius={5} speed={0.3} offset={0} shape="octahedron" color="#e23636" size={0.4} />
        <OrbitingShape radius={6} speed={0.2} offset={2} shape="torus" color="#0284c7" size={0.35} />
        <OrbitingShape radius={4.5} speed={0.35} offset={4} shape="tetrahedron" color="#38bdf8" size={0.3} />
        <OrbitingShape radius={7} speed={0.15} offset={1} shape="dodecahedron" color="#e23636" size={0.25} />
        <OrbitingShape radius={5.5} speed={0.25} offset={3} shape="torusKnot" color="#ff4d6d" size={0.3} />


        {/* Depth grid */}
        <DepthGrid />
      </Canvas>
    </div>
  );
}
