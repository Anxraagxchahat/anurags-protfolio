import { useState } from "react";
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react";
import { Check, Copy } from "lucide-react";

// Standalone showcase of the paper-design shader backgrounds, themed to the
// portfolio's Spider palette. Not mounted by default — the app's live
// background lives in components/BackgroundShader.jsx.
export default function DemoOne() {
  const [intensity] = useState(1.5);
  const [speed] = useState(1.0);
  const [activeEffect] = useState("combined");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("pnpm i 21st");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {activeEffect === "mesh" && (
        <MeshGradient
          className="w-full h-full absolute inset-0"
          colors={["#020205", "#9b0c0e", "#0369a1", "#ffffff"]}
          speed={speed}
          backgroundColor="#020205"
        />
      )}

      {activeEffect === "dots" && (
        <div className="w-full h-full absolute inset-0 bg-black">
          <DotOrbit
            className="w-full h-full"
            dotColor="#0284c7"
            orbitColor="#e23636"
            speed={speed}
            intensity={intensity}
          />
        </div>
      )}

      {activeEffect === "combined" && (
        <>
          <MeshGradient
            className="w-full h-full absolute inset-0"
            colors={["#020205", "#9b0c0e", "#0369a1", "#ffffff"]}
            speed={speed * 0.5}
            wireframe="true"
            backgroundColor="#020205"
          />
          <div className="w-full h-full absolute inset-0 opacity-60">
            <DotOrbit
              className="w-full h-full"
              dotColor="#0284c7"
              orbitColor="#e23636"
              speed={speed * 1.5}
              intensity={intensity * 0.8}
            />
          </div>
        </>
      )}

      {/* Lighting overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-accentPurple/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: `${3 / speed}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accentBlue/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: `${2 / speed}s`, animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: `${4 / speed}s`, animationDelay: "0.5s" }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center font-mono text-xs text-white/40">
          <div>...21st-cli...</div>
          <div className="mt-1 flex items-center gap-2">
            <span>pnpm i 21st.dev</span>
            <button
              onClick={copyToClipboard}
              className="pointer-events-auto opacity-30 hover:opacity-60 transition-opacity text-white/60 hover:text-white/80"
              title="Copy to clipboard"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
