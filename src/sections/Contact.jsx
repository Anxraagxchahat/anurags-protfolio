// ============================================================
// Contact — "Dimension 06 — Open a Channel" (doc 03 §7). Recruiter conversion.
// FormSubmit behavior is preserved EXACTLY from data/contact.js (endpoint,
// subject template, _captcha:false, the three response branches and messages).
// Left = conversion magnet (heading, body, social rows, response-time).
// Right = comic-panel glass form. World accent + reduced-motion honored.
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowRight, MessageSquare } from 'lucide-react';
import { form, contactCopy, socials } from '../data/contact';
import { useCapabilities } from '../lib/useReducedMotion';
import { fadeUpBlur, instant, slideInLeft, staggerContainer, STAGGER, VIEWPORT } from '../lib/motion';
import SectionShell from '../ui/SectionShell';
import GlassCard from '../ui/GlassCard';

// Brand glyphs (lucide dropped social icons) — inline, matching the originals.
const Github = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, Mail };
const SOCIAL_STYLE = {
  GitHub: 'hover:border-white/30 hover:bg-white/[0.04]',
  LinkedIn: 'hover:border-sky-400/30 hover:bg-sky-400/5',
  Email: 'hover:border-rose-400/30 hover:bg-rose-400/5',
};
const ICON_TINT = { GitHub: 'text-paper', LinkedIn: 'text-sky-400', Email: 'text-rose-400' };

export default function Contact() {
  const { reducedMotion } = useCapabilities();
  const reveal = reducedMotion ? instant : fadeUpBlur;
  const left = reducedMotion ? instant : slideInLeft;

  // ── Form state + FormSubmit flow (preserved verbatim from the original) ──
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
      const response = await fetch(form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: form.subjectTemplate(formState.name),
          _captcha: form.captcha,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.success === 'true') {
          setSubmitted(true);
          setActivationRequired(false);
          setFormState({ name: '', email: '', message: '' });
          setTimeout(() => setSubmitted(false), 5000);
        } else if (data.message && (data.message.includes('Activation') || data.message.includes('activate'))) {
          setSubmitted(true);
          setActivationRequired(true);
          setFormState({ name: '', email: '', message: '' });
        } else {
          setError(data.message || form.messages.errorGeneric);
        }
      } else {
        setError(form.messages.errorRequest);
      }
    } catch (err) {
      console.error(err);
      setError(form.messages.errorNetwork);
    } finally {
      setIsSubmitting(false);
    }
  };

  const field =
    'w-full rounded-xl border border-white/5 bg-white/[0.01] px-4 py-3 text-sm text-paper placeholder-paper-dim/50 outline-none transition-all duration-300 focus:border-spider-blue/40 focus:ring-1 focus:ring-spider-blue/20';

  return (
    <SectionShell id="contact" section="contact" dimension="06" eyebrow="Open a Channel" title="START A CONVERSATION">
      <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12">
        {/* Left — conversion magnet */}
        <motion.div
          variants={left}
          initial="initial"
          whileInView="animate"
          viewport={VIEWPORT}
          className="flex flex-col justify-between gap-8 text-left lg:col-span-5"
        >
          <div className="space-y-4">
            <h3 className="font-heading text-h3 font-bold tracking-wide text-paper">{contactCopy.heading}</h3>
            <p className="text-sm font-light leading-relaxed text-paper-dim">{contactCopy.body}</p>
          </div>

          <div className="flex w-full flex-col gap-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-paper-dim">
              Founder Connects
            </span>
            {socials.map((soc) => {
              const Icon = SOCIAL_ICONS[soc.icon] || Mail;
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between rounded-2xl border border-white/5 p-4 shadow-sm transition-all duration-300 glass-card ${SOCIAL_STYLE[soc.name] || ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-colors group-hover:bg-white/[0.06]">
                      <Icon className={`h-5 w-5 ${ICON_TINT[soc.name] || 'text-paper'}`} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-paper">{soc.name}</div>
                      <div className="text-xs text-paper-dim">{soc.label}</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-paper-dim transition-all duration-200 group-hover:translate-x-1 group-hover:text-paper" />
                </a>
              );
            })}
          </div>

          <div className="hidden items-center gap-3 text-xs font-medium text-paper-dim lg:flex">
            <MessageSquare className="h-4 w-4 text-spider-blue" />
            <span>{contactCopy.responseTime}</span>
          </div>
        </motion.div>

        {/* Right — comic-panel glass form */}
        <motion.div
          variants={reveal}
          initial="initial"
          whileInView="animate"
          viewport={VIEWPORT}
          className="flex lg:col-span-7"
        >
          <GlassCard
            variant="panel"
            className="comic-panel flex w-full flex-col justify-between p-6 md:p-8"
            style={{ boxShadow: '7px 7px 0 0 var(--accent)' }}
          >
            {submitted ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/10 text-2xl text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  ✓
                </div>
                {activationRequired ? (
                  <>
                    <h4 className="text-lg font-bold text-paper">{form.messages.activationTitle}</h4>
                    <p className="max-w-xs text-xs leading-relaxed text-paper-dim">
                      FormSubmit has sent an activation email to{' '}
                      <strong className="text-paper">vermakumaranurag@gmail.com</strong>. Please check your inbox
                      (including spam) and click the{' '}
                      <strong className="text-spider-blue">&quot;Activate Form&quot;</strong> link to start receiving
                      messages.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setActivationRequired(false);
                      }}
                      className="mt-2 rounded-lg px-4 py-1.5 text-xs font-semibold text-paper transition-colors glass-card hover:bg-white/10"
                    >
                      {form.messages.activationDismiss}
                    </button>
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-bold text-paper">{form.messages.successTitle}</h4>
                    <p className="max-w-xs text-xs leading-relaxed text-paper-dim">{form.messages.successBody}</p>
                  </>
                )}
              </div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                variants={staggerContainer(STAGGER.tight)}
                className="flex flex-1 flex-col gap-6 text-left"
              >
                <motion.div variants={reveal} className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-paper-dim">{form.labels.name}</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={form.placeholders.name}
                    className={field}
                  />
                </motion.div>

                <motion.div variants={reveal} className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-paper-dim">{form.labels.email}</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={form.placeholders.email}
                    className={field}
                  />
                </motion.div>

                <motion.div variants={reveal} className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-paper-dim">{form.labels.message}</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={form.placeholders.message}
                    className={`${field} resize-none`}
                  />
                </motion.div>

                {error && (
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs font-semibold tracking-wide text-rose-400">
                    {error}
                  </div>
                )}

                <motion.button
                  variants={reveal}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-rift bg-[length:200%_100%] py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_4px_20px_rgba(226,54,54,0.35)] transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>{isSubmitting ? form.buttons.submitting : form.buttons.idle}</span>
                  {!isSubmitting && <Send className="h-4 w-4" />}
                </motion.button>
              </motion.form>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </SectionShell>
  );
}
