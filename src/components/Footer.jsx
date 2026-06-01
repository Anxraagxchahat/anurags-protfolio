import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026; // Setting to 2026 based on timestamp metadata

  return (
    <footer className="relative py-12 px-4 overflow-hidden border-t border-white/5 bg-[#030712]">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
        
        {/* Left branding */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <a href="#home" className="font-bold tracking-widest text-white uppercase text-sm">
            ANURAG<span className="text-accentBlue text-xs">.VERMA</span>
          </a>
          <span className="text-[10px] text-gray-500 font-light tracking-wide">
            Student Founder & Web Architect
          </span>
        </div>

        {/* Center Copyright */}
        <div className="text-[10px] md:text-xs text-gray-500 font-light tracking-wider uppercase">
          © {currentYear} Anurag Verma. All rights reserved. Made in record speed.
        </div>

        {/* Right back to top button */}
        <div>
          <a
            href="#home"
            className="flex items-center justify-center p-2.5 rounded-full glass-card border-white/5 hover:border-accentBlue/30 text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}
