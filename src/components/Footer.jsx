import { ArrowUp } from 'lucide-react';

const Twitter = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = (props) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const currentYear = 2026; // Setting to 2026 based on timestamp metadata

  return (
    <footer className="relative py-12 px-4 overflow-hidden border-t border-white/5 bg-transparent">
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
        
        {/* Left branding and social links */}
        <div className="flex items-center space-x-4">
          <a 
            href="https://x.com/TheOpportunityX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-xl glass-card border-white/5 hover:border-accentBlue/30 text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
            title="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a 
            href="https://www.instagram.com/pandaxchahat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 rounded-xl glass-card border-white/5 hover:border-accentPurple/30 text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-300"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <div className="flex flex-col items-start space-y-1 text-left">
            <a href="#home" className="font-bold tracking-widest text-white uppercase text-sm">
              ANURAG<span className="text-accentBlue text-xs">.VERMA</span>
            </a>
            <span className="text-[10px] text-gray-500 font-light tracking-wide">
              Student Founder & Web Architect
            </span>
          </div>
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
