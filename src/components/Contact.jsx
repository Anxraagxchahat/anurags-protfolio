import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowRight, MessageSquare } from 'lucide-react';
import SectionShell from './ui/SectionShell';
import { VIEWPORT, EASE } from '../lib/motion';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIALS = [
  { name: 'GitHub', url: 'https://github.com/Anxraagxchahat', icon: <Github className="h-5 w-5" />, label: 'View Codebases' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/anurag-verma-388238246/', icon: <Linkedin className="h-5 w-5" />, label: "Let's Network" },
  { name: 'Email', url: 'mailto:anurag@opportunityx.co.in', icon: <Mail className="h-5 w-5" />, label: 'Direct Drop' },
];

const FIELD_CLASS =
  'w-full rounded-xl border border-ink/8 bg-white/50 px-4 py-3 text-sm text-ink placeholder-ink-mute outline-none transition-all duration-300 focus:border-aurora-violet/50 focus:bg-white/80 focus:ring-2 focus:ring-aurora-violet/15';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activationRequired, setActivationRequired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/vermakumaranurag@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New Portfolio Message from ${formState.name}`,
          _captcha: 'false',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.success === 'true') {
          setSubmitted(true);
          setActivationRequired(false);
          setFormState({ name: '', email: '', message: '' });
          setTimeout(() => {
            setSubmitted(false);
          }, 5000);
        } else if (data.message && (data.message.includes('Activation') || data.message.includes('activate'))) {
          setSubmitted(true);
          setActivationRequired(true);
          setFormState({ name: '', email: '', message: '' });
        } else {
          setError(data.message || 'Failed to send message. Please try again.');
        }
      } else {
        setError('Failed to send message. Please try again or email directly.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Connect"
      title="Start a"
      accent="conversation"
      className="border-t border-ink/5"
    >
      <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
        <div className="flex flex-col justify-between gap-8 lg:col-span-5">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-tight text-ink">
              Let&apos;s build something game-changing.
            </h3>
            <p className="text-[15px] leading-relaxed text-ink-mute">
              Whether you want to discuss AI/ML microservices, full-stack architectures, student
              opportunity frameworks, or collaborate on OpportunityX, my inbox is always open.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
              Founder Connects
            </span>
            {SOCIALS.map((soc) => (
              <a
                key={soc.name}
                href={soc.url}
                target={soc.url.startsWith('mailto:') ? undefined : '_blank'}
                rel={soc.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="group flex items-center justify-between rounded-2xl glass-card glass-card-hover p-4"
              >
                <div className="flex items-center gap-4">
                  <span className="rounded-xl border border-ink/5 bg-white/60 p-3 text-ink-soft transition-colors group-hover:text-aurora-indigo">
                    {soc.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink">{soc.name}</div>
                    <div className="text-xs text-ink-mute">{soc.label}</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-ink-mute transition-all duration-200 group-hover:translate-x-1 group-hover:text-aurora-indigo" />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 text-xs font-medium text-ink-mute lg:flex">
            <MessageSquare className="h-4 w-4 text-aurora-indigo" />
            <span>Response time: Typically under 4 hours.</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE.expo }}
          className="lg:col-span-7"
        >
          <div className="glass-panel flex h-full flex-col justify-center rounded-[2rem] p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white" style={{ background: 'var(--rift-gradient)' }}>
                  {'✓'}
                </div>
                {activationRequired ? (
                  <>
                    <h4 className="text-lg font-semibold text-ink">Activation Required!</h4>
                    <p className="max-w-xs text-xs leading-relaxed text-ink-mute">
                      FormSubmit has sent an activation email to{' '}
                      <strong className="text-ink">vermakumaranurag@gmail.com</strong>. Please check
                      your inbox (including spam) and click the{' '}
                      <strong className="text-ink">Activate Form</strong> link to start receiving
                      messages.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setActivationRequired(false);
                      }}
                      className="mt-2 rounded-lg glass-card px-4 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-white/80"
                    >
                      Okay, got it
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-semibold text-ink">Message Transmitted!</h4>
                    <p className="max-w-xs text-xs leading-relaxed text-ink-mute">
                      Thank you! Anurag will review your message and reach out shortly.
                    </p>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Elon Musk"
                    className={FIELD_CLASS}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className={FIELD_CLASS}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your product requirements..."
                    className={`${FIELD_CLASS} resize-none`}
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-ink/10 bg-white/50 p-3 text-xs font-medium text-ink">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(99,102,241,0.28)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(99,102,241,0.4)] disabled:opacity-50"
                  style={{ background: 'var(--rift-gradient)' }}
                >
                  <span>{isSubmitting ? 'Transmitting...' : 'Transmit Message'}</span>
                  {!isSubmitting && <Send className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
