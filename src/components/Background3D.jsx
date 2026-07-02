export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#020205]">
      {/* Red accent glow */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #e23636 0%, transparent 70%)' }}
      />
      {/* Blue accent glow */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-15 blur-[130px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0284c7 0%, transparent 70%)' }}
      />
      {/* Subtle purple middle accent glow */}
      <div 
        className="absolute top-[35%] right-[15%] w-[40%] h-[40%] rounded-full opacity-10 blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }}
      />
      
      {/* CSS overlay grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
}
