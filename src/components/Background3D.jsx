import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Drifting 3D web-like node network
function WebNodeNetwork() {
  const nodeCount = 50;
  const nodesRef = useRef();
  const linesRef = useRef();

  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.005
      ),
      color: Math.random() > 0.5 ? new THREE.Color('#e23636') : new THREE.Color('#0284c7'),
    }));
  }, []);

  const nodePositions = useMemo(() => new Float32Array(nodeCount * 3), []);
  const nodeColors = useMemo(() => {
    const c = new Float32Array(nodeCount * 3);
    nodes.forEach((n, i) => {
      c[i * 3] = n.color.r;
      c[i * 3 + 1] = n.color.g;
      c[i * 3 + 2] = n.color.b;
    });
    return c;
  }, [nodes]);

  useFrame(() => {
    // Update node positions
    nodes.forEach((node, i) => {
      node.pos.add(node.vel);
      if (Math.abs(node.pos.x) > 15) node.vel.x *= -1;
      if (Math.abs(node.pos.y) > 15) node.vel.y *= -1;
      if (Math.abs(node.pos.z) > 10) node.vel.z *= -1;

      nodePositions[i * 3] = node.pos.x;
      nodePositions[i * 3 + 1] = node.pos.y;
      nodePositions[i * 3 + 2] = node.pos.z;
    });

    if (nodesRef.current) {
      nodesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update connection lines
    if (linesRef.current) {
      const positions = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = nodes[i].pos.distanceTo(nodes[j].pos);
          if (d < 6) {
            positions.push(
              nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
              nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
            );
          }
        }
      }
      const arr = new Float32Array(positions);
      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(arr, 3)
      );
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Node points */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodeCount}
            array={nodePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={nodeCount}
            array={nodeColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Connection web lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#e23636" transparent opacity={0.05} />
      </lineSegments>
    </group>
  );
}

// Spider web corner in 3D space
function CornerWeb({ position, scale = 1, rotation = [0, 0, 0] }) {
  const webRef = useRef();

  useFrame((state) => {
    if (webRef.current) {
      webRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  const geometry = useMemo(() => {
    const points = [];
    const radials = 8;
    const rings = 5;
    const maxR = 4 * scale;

    // Radial lines
    for (let r = 0; r < radials; r++) {
      const angle = (r / radials) * Math.PI * 0.5;
      points.push(0, 0, 0);
      points.push(
        Math.cos(angle) * maxR,
        Math.sin(angle) * maxR,
        0
      );
    }

    // Concentric arcs (approximated as segments)
    for (let ring = 1; ring <= rings; ring++) {
      const r = (ring / rings) * maxR;
      const segments = 16;
      for (let s = 0; s < segments; s++) {
        const a1 = (s / segments) * Math.PI * 0.5;
        const a2 = ((s + 1) / segments) * Math.PI * 0.5;
        points.push(
          Math.cos(a1) * r, Math.sin(a1) * r, 0,
          Math.cos(a2) * r, Math.sin(a2) * r, 0
        );
      }
    }

    return new Float32Array(points);
  }, [scale]);

  return (
    <group position={position} rotation={rotation} ref={webRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={geometry.length / 3}
            array={geometry}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#e23636" transparent opacity={0.06} />
      </lineSegments>
    </group>
  );
}

// Scroll-reactive camera
function ScrollCamera() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    const handleMouse = (e) => {
      targetRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  useFrame(() => {
    mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.02;
    mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.02;

    // Subtle mouse parallax
    camera.position.x = mouseRef.current.x * 0.8;
    camera.position.y = mouseRef.current.y * -0.5 - scrollRef.current * 0.002;
    camera.lookAt(0, -scrollRef.current * 0.002, 0);
  });

  return null;
}

// Main Background 3D Scene
export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0" style={{ background: '#020205' }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        {/* Minimal ambient lighting */}
        <ambientLight intensity={0.08} />
        <pointLight position={[10, 10, 10]} color="#0284c7" intensity={0.2} />
        <pointLight position={[-10, -10, 5]} color="#e23636" intensity={0.15} />

        {/* Scroll-reactive camera */}
        <ScrollCamera />

        {/* Web node network */}
        <WebNodeNetwork />

        {/* Corner spider webs */}
        <CornerWeb position={[-12, 8, -5]} scale={1.2} />
        <CornerWeb position={[12, 8, -5]} scale={1} rotation={[0, 0, -Math.PI / 2]} />
        <CornerWeb position={[-12, -8, -5]} scale={1} rotation={[0, 0, Math.PI / 2]} />
        <CornerWeb position={[12, -8, -5]} scale={0.8} rotation={[0, 0, Math.PI]} />

        {/* Sparkles ambient */}
        <Sparkles count={40} scale={30} size={0.8} speed={0.15} color="#e23636" />
        <Sparkles count={30} scale={35} size={0.6} speed={0.1} color="#0284c7" />

        {/* Star field background */}
        <Stars radius={80} depth={60} count={2000} factor={2.5} saturation={0} fade speed={0.3} />
      </Canvas>

      {/* CSS overlay grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
