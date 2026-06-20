// ============================================================
// Footer — clean professional close (doc 03 §8). Signature identity, footer
// socials (X / Instagram), copyright, and a back-to-top PORTAL interaction
// (reuses usePortal → Lenis scrollTo('#home', top)). All copy/links from the
// locked data/contact.js. Reduced-motion: the portal collapses to a cross-fade.
// ============================================================

import { ArrowUp } from 'lucide-react';
import { footerSocials, footer } from '../data/contact';
import { usePortal } from '../ui/PortalTransition';
import { useLenisContext } from '../lib/useLenis';
import { getSectionAccent } from '../lib/theme';

// Footer socials are X (Twitter) + Instagram — small custom glyphs.
const Twitter = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const Instagram = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const ICONS = { twitter: Twitter, instagram: Instagram };

export default function Footer() {
  const { playPortal } = usePortal();
  const { scrollTo } = useLenisContext();

  const toTop = (e) => {
    e.preventDefault();
    playPortal({ accent: getSectionAccent('hero'), onCover: () => scrollTo(0, { offset: 0 }) });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-transparent px-4 py-12">
      <div className="relative z-10 mx-auto flex w-full max-w-content flex-col items-center justify-between gap-6 md:flex-row">
        {/* Branding + socials */}
        <div className="flex items-center gap-4">
          {footerSocials.map((soc) => {
            const Icon = ICONS[soc.icon];
            return (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                title={soc.name}
                className="rounded-xl border border-white/5 p-2 text-paper-dim transition-all duration-300 glass-card hover:border-spider-blue/30 hover:bg-white/[0.04] hover:text-paper"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
          <div className="flex flex-col items-start gap-1 text-left">
            <a href="#home" onClick={toTop} className="font-heading text-sm font-bold uppercase tracking-widest text-paper">
              ANURAG<span className="text-xs text-spider-blue">.VERMA</span>
            </a>
            <span className="text-[10px] font-light tracking-wide text-paper-dim">{footer.tagline}</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-[10px] font-light uppercase tracking-wider text-paper-dim md:text-xs">
          {footer.copyright}
        </div>

        {/* Back-to-top portal */}
        <button
          type="button"
          onClick={toTop}
          title="Back to top"
          aria-label="Back to top"
          className="group flex items-center justify-center rounded-full border border-white/5 p-2.5 text-paper-dim transition-all duration-300 glass-card hover:border-spider-blue/30 hover:bg-white/[0.04] hover:text-paper"
        >
          <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  );
}
