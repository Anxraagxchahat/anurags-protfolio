/**
 * Full-screen animated background for the whole portfolio.
 * Light minimalist theme — white base with subtle gray gradient drift.
 */
export default function BackgroundShader() {
  return (
    <div className="fixed inset-0 z-0 bg-white">
      {/* Animated CSS gradient — drift animations are hardware-accelerated */}
      <div className="bg-shader-fallback absolute inset-0 opacity-40" />

      {/* Fine Grid Pattern Overlay for minimalist technical aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(9,9,11,0.25) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle vignette — slightly darker edges so content breathes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(255,255,255,0) 0%, rgba(244,244,245,0.4) 75%, rgba(228,228,231,0.5) 100%)',
        }}
      />
    </div>
  );
}
