import { ArrowUp } from 'lucide-react';

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

const SOCIALS = [
  { href: 'https://x.com/TheOpportunityX', title: 'X (Twitter)', icon: <Twitter className="h-4 w-4" /> },
  { href: 'https://www.instagram.com/pandaxchahat', title: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/5 px-6 py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-4">
          {SOCIALS.map((soc) => (
            <a
              key={soc.title}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              title={soc.title}
              className="rounded-xl glass-card p-2.5 text-ink-mute transition-all duration-300 hover:text-aurora-indigo hover:-translate-y-0.5"
            >
              {soc.icon}
            </a>
          ))}
          <div className="flex flex-col">
            <a href="#home" className="text-sm font-bold uppercase tracking-[0.14em] text-ink">
              Anurag<span className="text-ink-mute">.Verma</span>
            </a>
            <span className="text-[11px] font-medium text-ink-mute">
              Student Founder & Web Architect
            </span>
          </div>
        </div>

        <div className="text-center font-mono text-[10px] uppercase tracking-wider text-ink-mute md:text-xs">
          &copy; 2026 Anurag Verma. All rights reserved. Made in record speed.
        </div>

        <a
          href="#home"
          title="Back to Top"
          className="rounded-full glass-card p-3 text-ink-mute transition-all duration-300 hover:-translate-y-1 hover:text-aurora-indigo"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
