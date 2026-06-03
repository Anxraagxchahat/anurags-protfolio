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

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles array (fewer particles on mobile for performance)
    const particleCount = Math.min(85, Math.floor((width * height) / 18000));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      particles.push({
        x: px,
        y: py,
        vx: 0,
        vy: 0,
        homeX: px,
        homeY: py,
        homeVx: (Math.random() - 0.5) * 0.2, // slow organic anchor drift velocity
        homeVy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 1,
        // Crimson Red (#e23636) or Electric Blue (#0284c7)
        color: Math.random() > 0.55 ? '#e23636' : '#0284c7'
      });
    }

    // Mouse tracking for canvas interaction (interpolated targets)
    let targetMouse = { x: null, y: null };
    let canvasMouse = { x: null, y: null, radius: 180 };
    
    const handleMouseMoveCanvas = (e) => {
      if (canvasMouse.x === null || canvasMouse.y === null) {
        canvasMouse.x = e.clientX;
        canvasMouse.y = e.clientY;
      }
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleMouseLeaveCanvas = () => {
      targetMouse.x = null;
      targetMouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMoveCanvas);
    window.addEventListener('mouseleave', handleMouseLeaveCanvas);

    // Corner Web drawing helper
    const drawCornerWeb = (cx, cy, maxRadius, startAngle, endAngle) => {
      ctx.strokeStyle = 'rgba(226, 54, 54, 0.08)'; // Subtle crimson web line
      ctx.lineWidth = 0.6;
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

          // Concave sag towards center
          const midAngle = angle - (endAngle - startAngle) / (2 * numRadials);
          const cpR = r * 0.93;
          const cpX = cx + Math.cos(midAngle) * cpR;
          const cpY = cy + Math.sin(midAngle) * cpR;

          ctx.quadraticCurveTo(cpX, cpY, nextX, nextY);
        }
        ctx.stroke();
      }
    };

    const draw = () => {
      // Smoothly interpolate canvas mouse position towards target
      if (targetMouse.x !== null && targetMouse.y !== null) {
        if (canvasMouse.x === null || canvasMouse.y === null) {
          canvasMouse.x = targetMouse.x;
          canvasMouse.y = targetMouse.y;
        } else {
          canvasMouse.x += (targetMouse.x - canvasMouse.x) * 0.08;
          canvasMouse.y += (targetMouse.y - canvasMouse.y) * 0.08;
        }
      } else {
        canvasMouse.x = null;
        canvasMouse.y = null;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw static elegant corner spider webs
      const webRadius = Math.min(220, width * 0.25);
      drawCornerWeb(0, 0, webRadius, 0, Math.PI / 2); // Top Left
      drawCornerWeb(width, 0, webRadius, Math.PI / 2, Math.PI); // Top Right
      drawCornerWeb(0, height, webRadius, 1.5 * Math.PI, 2 * Math.PI); // Bottom Left
      drawCornerWeb(width, height, webRadius, Math.PI, 1.5 * Math.PI); // Bottom Right

      // 2. Draw drifting particle nodes using spring-mass physics
      particles.forEach((p) => {
        // Slow drift of anchor coordinates
        p.homeX += p.homeVx;
        p.homeY += p.homeVy;

        // Bounce anchors off screen boundaries
        if (p.homeX < 0 || p.homeX > width) p.homeVx *= -1;
        if (p.homeY < 0 || p.homeY > height) p.homeVy *= -1;

        // Interactive mouse attraction/grab force
        if (canvasMouse.x !== null && canvasMouse.y !== null) {
          const dx = canvasMouse.x - p.x;
          const dy = canvasMouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < canvasMouse.radius) {
            const force = (canvasMouse.radius - dist) / canvasMouse.radius;
            // pull particles towards mouse with elastic spring acceleration
            p.vx += (dx / dist) * force * 0.8;
            p.vy += (dy / dist) * force * 0.8;
          }
        }

        // Hooke's Law: Spring force back to drifting anchor home
        const dxHome = p.homeX - p.x;
        const dyHome = p.homeY - p.y;
        p.vx += dxHome * 0.03; // stiffness
        p.vy += dyHome * 0.03;

        // Friction damping (decays oscillation)
        p.vx *= 0.88;
        p.vy *= 0.88;

        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // 3. Connect close particle nodes to construct a web lattice
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Red-blue mixed link color or electric blue
            ctx.strokeStyle = p1.color === p2.color 
              ? p1.color 
              : 'rgba(120, 150, 220, 0.8)';
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }

        // 4. Interactive Web-Slinging to Mouse
        if (canvasMouse.x !== null && canvasMouse.y !== null) {
          const dx = p1.x - canvasMouse.x;
          const dy = p1.y - canvasMouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < canvasMouse.radius) {
            const alpha = (1 - dist / canvasMouse.radius) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(canvasMouse.x, canvasMouse.y);
            ctx.strokeStyle = p1.color === '#e23636' 
              ? `rgba(226, 54, 54, ${alpha})`
              : `rgba(2, 132, 199, ${alpha})`;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.9;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMoveCanvas);
      window.removeEventListener('mouseleave', handleMouseLeaveCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-darkBg">
      {/* Interactive Web Canvas */}
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
