import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, ArrowRight, MessageSquare } from 'lucide-react';

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
      const response = await fetch("https://formsubmit.co/ajax/vermakumaranurag@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New Portfolio Message from ${formState.name}`,
          _captcha: "false"
        })
      });

      const data = await response.json();
      if (response.ok) {
        if (data.success === "true") {
          setSubmitted(true);
          setActivationRequired(false);
          setFormState({ name: '', email: '', message: '' });
          setTimeout(() => {
            setSubmitted(false);
          }, 5000);
        } else if (data.message && (data.message.includes("Activation") || data.message.includes("activate"))) {
          setSubmitted(true);
          setActivationRequired(true);
          setFormState({ name: '', email: '', message: '' });
        } else {
          setError(data.message || "Failed to send message. Please try again.");
        }
      } else {
        setError("Failed to send message. Please try again or email directly.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/Anxraagxchahat",
      icon: <Github className="w-5 h-5" />,
      color: "hover:text-white hover:border-white/30 hover:bg-white/[0.04]",
      label: "View Codebases"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anurag-verma-388238246/",
      icon: <Linkedin className="w-5 h-5 text-sky-400" />,
      color: "hover:text-sky-400 hover:border-sky-400/30 hover:bg-sky-400/5",
      label: "Let's Network"
    },
    {
      name: "Email",
      url: "mailto:vermakumaranurag@gmail.com",
      icon: <Mail className="w-5 h-5 text-rose-400" />,
      color: "hover:text-rose-400 hover:border-rose-400/30 hover:bg-rose-400/5",
      label: "Direct Drop"
    }
  ];

  return (
    <section id="contact" className="relative py-24 px-4 overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#030712] to-[#040917]">
      {/* Background ambient backlights */}
      <div className="absolute top-[20%] right-[-10%] w-[380px] h-[380px] rounded-full bg-accentBlue/5 glow-blob" />
      <div className="absolute bottom-[20%] left-[-10%] w-[380px] h-[380px] rounded-full bg-accentPurple/5 glow-blob" />

      <div className="w-full max-w-5xl mx-auto z-10">

        {/* Section Heading */}
        <div className="flex flex-col items-start text-left mb-16">
          <span className="text-xs font-bold tracking-widest text-accentPurple uppercase mb-2">CONNECT</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
            START A CONVERSATION
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accentPurple to-accentBlue mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Column: Magnet connects and context */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                Let's build something game-changing.
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Whether you want to discuss AI/ML microservices, full-stack architectures, student opportunity frameworks, or collaborate on OpportunityX, my inbox is always open.
              </p>
            </div>

            {/* Premium Social Links Grid */}
            <div className="flex flex-col space-y-4 w-full">
              <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1">FOUNDER CONNECTS</span>
              {socials.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-2xl glass-card border-white/5 transition-all duration-300 group shadow-sm ${soc.color}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.06] transition-colors">
                      {soc.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white">{soc.name}</div>
                      <div className="text-xs text-gray-500">{soc.label}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 group-hover:text-white transition-all duration-200" />
                </a>
              ))}
            </div>

            {/* Micro Quote */}
            <div className="hidden lg:flex items-center space-x-3 text-xs text-gray-500 font-medium">
              <MessageSquare className="w-4 h-4 text-accentBlue" />
              <span>Response time: Typically under 4 hours.</span>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex"
          >
            <div className="w-full glass-card rounded-3xl p-6 md:p-8 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between">

              {submitted ? (
                <div className="flex-1 flex flex-col items-center justify-center space-y-4 py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-bounce">
                    ✓
                  </div>
                  {activationRequired ? (
                    <>
                      <h4 className="text-lg font-bold text-white">Activation Required!</h4>
                      <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                        FormSubmit has sent an activation email to <strong className="text-white">vermakumaranurag@gmail.com</strong>.
                        Please check your inbox (including spam) and click the <strong className="text-accentBlue-light">"Activate Form"</strong> link to start receiving messages.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setActivationRequired(false);
                        }}
                        className="mt-2 px-4 py-1.5 glass-card text-xs font-semibold rounded-lg text-white hover:bg-white/10 transition-colors"
                      >
                        Okay, got it
                      </button>
                    </>
                  ) : (
                    <>
                      <h4 className="text-lg font-bold text-white">Message Transmitted!</h4>
                      <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                        Thank you! Anurag will review your message and reach out shortly.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6 text-left">

                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Elon Musk"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.01] border border-white/5 focus:border-accentBlue/40 focus:ring-1 focus:ring-accentBlue/20 text-white placeholder-gray-600 text-sm outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.01] border border-white/5 focus:border-accentBlue/40 focus:ring-1 focus:ring-accentBlue/20 text-white placeholder-gray-600 text-sm outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 tracking-wider uppercase">Your Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your product requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.01] border border-white/5 focus:border-accentBlue/40 focus:ring-1 focus:ring-accentBlue/20 text-white placeholder-gray-600 text-sm outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {error && (
                    <div className="text-xs text-rose-400 font-semibold tracking-wide bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center space-x-2 py-3.5 w-full bg-gradient-to-r from-accentBlue to-accentPurple hover:brightness-110 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(59,130,246,0.35)] cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Transmit Message'}</span>
                    {!isSubmitting && <Send className="w-4 h-4" />}
                  </button>

                </form>
              )}

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
