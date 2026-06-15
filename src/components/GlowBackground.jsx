import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function GlowBackground() {
  const canvasRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse tracking
  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMoveGlow = (e) => {
      mouseX.set(e.clientX - 150); // Offset by half of glow width (300px)
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMoveGlow);
    return () => window.removeEventListener('mousemove', handleMouseMoveGlow);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let centerX = width / 2;
    let centerY = height / 2;

    // Perspective parameters
    const focalLength = 500;

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
    };
    window.addEventListener('resize', handleResize);

    // 3D Particles array
    const particleCount = Math.min(100, Math.floor((width * height) / 16000));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        // Set coordinates relative to center of screen
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000 - 300, // Depth from -300 to 700
        radius: Math.random() * 1.8 + 1,
        // Drift velocities in 3D
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        color: Math.random() > 0.55 ? '#e23636' : '#0284c7',
        // Interactive offsets
        offsetX: 0,
        offsetY: 0,
        offsetZ: 0
      });
    }

    // Interactive 3D Web Core (Icosahedron shape)
    // 12 Vertices of an Icosahedron
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
    const rawVertices = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ];
    
    // Scale vertices
    const shapeScale = 75;
    const vertices = rawVertices.map(v => {
      const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
      return {
        x: (v[0] / len) * shapeScale,
        y: (v[1] / len) * shapeScale,
        z: (v[2] / len) * shapeScale,
        baseX: (v[0] / len) * shapeScale,
        baseY: (v[1] / len) * shapeScale,
        baseZ: (v[2] / len) * shapeScale
      };
    });

    // Find edges (indices that are close to each other)
    const edges = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        // Icosahedron edge distance is approx 1.05 * scale
        if (dist < shapeScale * 1.3) {
          edges.push([i, j]);
        }
      }
    }

    // Target rotation angles (driven by mouse)
    let angleX = 0;
    let angleY = 0;
    let targetAngleX = 0;
    let targetAngleY = 0;

    // Self-spin for 3D polyhedron shape
    let shapeAngleX = 0;
    let shapeAngleY = 0;

    // Mouse positions
    let mouse = { x: null, y: null };
    
    const handleMouseMoveCanvas = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Calculate target rotation relative to screen center
      targetAngleY = ((e.clientX - centerX) / centerX) * 0.28;
      targetAngleX = -((e.clientY - centerY) / centerY) * 0.28;
    };

    const handleMouseLeaveCanvas = () => {
      mouse.x = null;
      mouse.y = null;
      targetAngleX = 0;
      targetAngleY = 0;
    };

    window.addEventListener('mousemove', handleMouseMoveCanvas);
    window.addEventListener('mouseleave', handleMouseLeaveCanvas);

    // Scroll tracker
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2D Corner Web helper
    const drawCornerWeb = (cx, cy, maxRadius, startAngle, endAngle) => {
      ctx.strokeStyle = 'rgba(226, 54, 54, 0.06)';
      ctx.lineWidth = 0.5;
      const numRadials = 6;
      const numArcs = 5;

      const radials = [];
      for (let i = 0; i <= numRadials; i++) {
        const angle = startAngle + (i * (endAngle - startAngle)) / numRadials;
        const x = cx + Math.cos(angle) * maxRadius;
        const y = cy + Math.sin(angle) * maxRadius;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        radials.push({ angle, x, y });
      }

      for (let a = 1; a <= numArcs; a++) {
        const r = (a / numArcs) * maxRadius;
        ctx.beginPath();
        const startX = cx + Math.cos(startAngle) * r;
        const startY = cy + Math.sin(startAngle) * r;
        ctx.moveTo(startX, startY);

        for (let i = 1; i <= numRadials; i++) {
          const angle = radials[i].angle;
          const nextX = cx + Math.cos(angle) * r;
          const nextY = cy + Math.sin(angle) * r;

          const midAngle = angle - (endAngle - startAngle) / (2 * numRadials);
          const cpR = r * 0.93;
          const cpX = cx + Math.cos(midAngle) * cpR;
          const cpY = cy + Math.sin(midAngle) * cpR;

          ctx.quadraticCurveTo(cpX, cpY, nextX, nextY);
        }
        ctx.stroke();
      }
    };

    // Main 3D render loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw static background corner webs
      const webRadius = Math.min(220, width * 0.25);
      drawCornerWeb(0, 0, webRadius, 0, Math.PI / 2);
      drawCornerWeb(width, 0, webRadius, Math.PI / 2, Math.PI);
      drawCornerWeb(0, height, webRadius, 1.5 * Math.PI, 2 * Math.PI);
      drawCornerWeb(width, height, webRadius, Math.PI, 1.5 * Math.PI);

      // Smoothly interpolate camera/world angles
      angleX += (targetAngleX - angleX) * 0.05;
      angleY += (targetAngleY - angleY) * 0.05;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Scroll speed translation along Z axis
      const scrollDepth = scrollY * 0.7;

      // Project particles
      const projectedParticles = [];

      particles.forEach((p) => {
        // Apply passive 3D drift velocity
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around screen boundaries in X & Y
        const boundaryX = width * 1.2;
        const boundaryY = height * 1.2;
        if (p.x < -boundaryX) p.x += boundaryX * 2;
        if (p.x > boundaryX) p.x -= boundaryX * 2;
        if (p.y < -boundaryY) p.y += boundaryY * 2;
        if (p.y > boundaryY) p.y -= boundaryY * 2;

        // Infinite 3D Tunnel/Scroll wrap in Z depth
        // We calculate virtual Z relative to scroll offset
        let relativeZ = ((p.z - scrollDepth + 300) % 1000);
        if (relativeZ < 0) relativeZ += 1000;
        relativeZ -= 300; // Shift back to range [-300, 700]

        // Mouse gravity pull (push/pull in 3D depending on proximity)
        if (mouse.x !== null && mouse.y !== null) {
          // Calculate particle projected coordinate roughly to find distance
          const scaleApprox = focalLength / (focalLength + relativeZ);
          const pScreenX = centerX + p.x * scaleApprox;
          const pScreenY = centerY + p.y * scaleApprox;

          const dx = mouse.x - pScreenX;
          const dy = mouse.y - pScreenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const pullForce = (180 - dist) * 0.04;
            p.offsetX += (dx / dist) * pullForce;
            p.offsetY += (dy / dist) * pullForce;
          }
        }

        // Apply offsets with smooth damping return
        p.offsetX *= 0.9;
        p.offsetY *= 0.9;
        const currentX = p.x + p.offsetX;
        const currentY = p.y + p.offsetY;

        // Perform 3D Rotation (Pitch & Yaw)
        // Rotate around Y axis (Yaw)
        let rotY_X = currentX * cosY - relativeZ * sinY;
        let rotY_Z = currentX * sinY + relativeZ * cosY;

        // Rotate around X axis (Pitch)
        let rotX_Y = currentY * cosX - rotY_Z * sinX;
        let rotX_Z = currentY * sinX + rotY_Z * cosX;

        // Perspective Projection calculation
        const zDepth = rotX_Z;
        const zLimit = -focalLength + 20;

        if (zDepth > zLimit) {
          const scale = focalLength / (focalLength + zDepth);
          const projX = centerX + rotY_X * scale;
          const projY = centerY + rotX_Y * scale;

          // Only keep inside frame boundaries with padding
          if (projX >= -100 && projX <= width + 100 && projY >= -100 && projY <= height + 100) {
            projectedParticles.push({
              px: projX,
              py: projY,
              pz: zDepth,
              scale: scale,
              color: p.color,
              radius: p.radius * scale
            });
          }
        }
      });

      // Sort particles by depth (Z-buffer) so distant ones are drawn first
      projectedParticles.sort((a, b) => b.pz - a.pz);

      // Draw particle connections in 3D projected space
      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        
        // Connect to other close particles
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p2 = projectedParticles[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect if close and they are in similar depth levels
          if (dist < 120 && Math.abs(p1.pz - p2.pz) < 150) {
            const alpha = (1 - dist / 120) * (1 - Math.abs(p1.pz - p2.pz) / 150) * 0.12 * p1.scale;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = p1.color === p2.color ? p1.color : 'rgba(120, 150, 220, 0.8)';
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.5 * p1.scale;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }

        // Draw particle nodes
        ctx.beginPath();
        ctx.arc(p1.px, p1.py, Math.max(0.4, p1.radius), 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        // Fade particles that are far away (depth cueing)
        const alpha = Math.min(1.0, Math.max(0.1, p1.scale));
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Interactive mouse connection threads
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.px - mouse.x;
          const dy = p1.py - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            const alphaThread = (1 - dist / 160) * 0.22 * p1.scale;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = p1.color === '#e23636' 
              ? `rgba(226, 54, 54, ${alphaThread})`
              : `rgba(2, 132, 199, ${alphaThread})`;
            ctx.globalAlpha = alphaThread;
            ctx.lineWidth = 0.7 * p1.scale;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // 2. Draw 3D Wireframe Polyhedron (Web Crystal Core) in the background
      // Rotate shape self-spin
      shapeAngleX += 0.004;
      shapeAngleY += 0.005;

      const cosShapeX = Math.cos(shapeAngleX);
      const sinShapeX = Math.sin(shapeAngleX);
      const cosShapeY = Math.cos(shapeAngleY);
      const sinShapeY = Math.sin(shapeAngleY);

      // Central position of the 3D core in world space
      // Floats in top right sector, matching the Hero portrait area
      const shapeCenterX = width > 1024 ? width * 0.28 : 0;
      const shapeCenterY = width > 1024 ? -height * 0.22 : -height * 0.35;
      const shapeCenterZ = 120; // depth

      const projectedShapeVertices = [];

      vertices.forEach((v) => {
        // First rotate around shape center coordinates
        // Y-axis rotate
        let sx = v.baseX * cosShapeY - v.baseZ * sinShapeY;
        let sz = v.baseX * sinShapeY + v.baseZ * cosShapeY;
        // X-axis rotate
        let sy = v.baseY * cosShapeX - sz * sinShapeX;
        let sz2 = v.baseY * sinShapeX + sz * cosShapeX;

        // Position in 3D world space
        const worldX = sx + shapeCenterX;
        const worldY = sy + shapeCenterY;
        const worldZ = sz2 + shapeCenterZ;

        // Apply mouse camera pitch & yaw rotation
        let rotWorldY_X = worldX * cosY - worldZ * sinY;
        let rotWorldY_Z = worldX * sinY + worldZ * cosY;

        let rotWorldX_Y = worldY * cosX - rotWorldY_Z * sinX;
        let rotWorldX_Z = worldY * sinX + rotWorldY_Z * cosX;

        // Project
        const scale = focalLength / (focalLength + rotWorldX_Z);
        const px = centerX + rotWorldY_X * scale;
        const py = centerY + rotWorldX_Y * scale;

        projectedShapeVertices.push({ px, py, scale, pz: rotWorldX_Z });
      });

      // Draw Edges
      ctx.strokeStyle = 'rgba(226, 54, 54, 0.2)'; // spider crimson red edge
      ctx.lineWidth = 0.8;
      edges.forEach(([i, j]) => {
        const v1 = projectedShapeVertices[i];
        const v2 = projectedShapeVertices[j];
        
        ctx.beginPath();
        ctx.moveTo(v1.px, v1.py);
        ctx.lineTo(v2.px, v2.py);
        ctx.strokeStyle = `rgba(226, 54, 54, ${0.15 * v1.scale})`;
        ctx.lineWidth = 0.6 * v1.scale;
        ctx.stroke();
      });

      // Draw node spheres at vertex joints
      projectedShapeVertices.forEach((v) => {
        ctx.beginPath();
        ctx.arc(v.px, v.py, 2.5 * v.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#0284c7'; // Electric blue joints
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#0284c7';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMoveCanvas);
      window.removeEventListener('mouseleave', handleMouseLeaveCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-darkBg">
      {/* Interactive 3D Web Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85 z-0" 
      />

      {/* Dynamic Ambient Background Glow Blobs (Drifting) */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accentPurple/15 glow-blob"
      />
      
      <motion.div
        animate={{
          x: [0, -50, 60, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-accentBlue/10 glow-blob"
      />

      <div className="absolute top-[-10%] right-[10%] w-[400px] h-[400px] rounded-full bg-accentPurple/10 glow-blob" />

      {/* Mouse Follow Glow Highlight (only visible on screen hover) */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-accentBlue/10 to-accentPurple/10 opacity-60 blur-[80px] hidden md:block"
      />

      {/* Grid Pattern Overlay for Startup/Founder vibe */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
}
