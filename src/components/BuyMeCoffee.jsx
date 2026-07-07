import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowUpRight, Sparkles, Copy, Check, X, Smartphone, CheckCircle2 } from 'lucide-react';

const CONFIG = {
  upiId: 'vermakumaranurag-3@oksbi', // Replace with your actual UPI ID
  name: 'Anurag Verma',
  kofiUrl: 'https://ko-fi.com/', // Optional international fallback
};

export default function BuyMeCoffee() {
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile] = useState(
    () => typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
  const [hasPaid, setHasPaid] = useState(false);

  const COFFEE_TYPES = [
    {
      id: 'espresso',
      name: 'Espresso',
      price: '₹80',
      numericPrice: 80,
      description: 'Quick debug fuel',
      emoji: '☕'
    },
    {
      id: 'cortado',
      name: 'Cortado',
      price: '₹150',
      numericPrice: 150,
      description: 'Feature builder fuel',
      emoji: '🥛☕'
    },
    {
      id: 'coldbrew',
      name: 'Cold Brew',
      price: '₹250',
      numericPrice: 250,
      description: 'All-nighter fuel',
      emoji: '🧊☕'
    }
  ];

  const handleCoffeeSelect = (coffee) => {
    setSelectedCoffee(coffee);
    setHasPaid(false);
    setShowModal(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(CONFIG.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate UPI URI for mobile redirect
  const upiUri = selectedCoffee
    ? `upi://pay?pa=${CONFIG.upiId}&pn=${encodeURIComponent(CONFIG.name)}&am=${selectedCoffee.numericPrice}&cu=INR&tn=Coffee%20for%20Anurag`
    : `upi://pay?pa=${CONFIG.upiId}&pn=${encodeURIComponent(CONFIG.name)}&cu=INR`;

  return (
    <section className="relative pb-24 pt-4 px-4 overflow-hidden bg-transparent">
      {/* Background glow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-aurora-violet/5 blur-[90px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card border-zinc-900/5 p-8 md:p-10 rounded-[2.5rem] shadow-[0_15px_40px_rgba(9,9,11,0.03)] relative overflow-hidden"
        >
          {/* Subtle aurora shine on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-violet/[0.02] via-transparent to-aurora-cyan/[0.02] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side: Message */}
            <div className="lg:col-span-6 text-left space-y-4">
              <div className="inline-flex items-center space-x-2 bg-black/[0.02] border border-zinc-900/5 px-3 py-1 rounded-full text-[10px] font-bold text-zinc-800 tracking-wider uppercase font-mono">
                <Sparkles className="w-3.5 h-3.5 text-aurora-violet" />
                <span>Support the Craft</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 font-sans uppercase">
                Fuel the late-night commits
              </h3>

              <p className="text-sm text-zinc-600 font-medium leading-relaxed">
                I build open-source tools like <strong className="text-zinc-900">OpportunityX</strong> to make opportunity discovery easier for students. If you appreciate the work and want to help keep the servers running, consider fueling the engine. No obligations, just positive vibes.
              </p>

              <div className="flex items-center space-x-2 text-xs text-zinc-500 font-bold">
                <Heart className="w-3.5 h-3.5 text-aurora-pink fill-aurora-pink/20 animate-pulse" />
                <span>100% of support goes directly into tool hosting and APIs.</span>
              </div>
            </div>

            {/* Right side: Interactive Coffee Options */}
            <div className="lg:col-span-6 flex flex-col space-y-4 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {COFFEE_TYPES.map((coffee) => (
                  <button
                    key={coffee.id}
                    onClick={() => handleCoffeeSelect(coffee)}
                    className="flex flex-col items-center justify-between p-4 rounded-2xl border text-center transition-all duration-300 group relative cursor-pointer bg-white/40 border-zinc-900/5 hover:border-zinc-900/15 hover:bg-white/80 hover:scale-[1.02] shadow-sm"
                  >
                    <div className="text-2xl mb-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      {coffee.emoji}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">
                        {coffee.name}
                      </div>
                      <div className="text-[10px] mt-0.5 leading-tight text-zinc-500">
                        {coffee.description}
                      </div>
                    </div>
                    <div className="mt-3 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide bg-black/[0.04] text-zinc-800 border border-transparent">
                      {coffee.price}
                    </div>

                    {/* Hover Glow Border */}
                    <div className="absolute inset-0 rounded-2xl border border-aurora-violet/0 group-hover:border-aurora-violet/20 transition-all duration-300 pointer-events-none" />
                  </button>
                ))}
              </div>

              {/* Direct UPI pay button */}
              <button
                onClick={() => handleCoffeeSelect(null)}
                className="flex items-center justify-center space-x-2 py-3.5 w-full bg-zinc-900 text-white hover:brightness-95 text-xs font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(9,9,11,0.06)] group cursor-pointer"
              >
                <span>Support via custom UPI payment</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Render modal in portal so it stays on top of footer stacking context */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="absolute inset-0 bg-black/45 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                onClick={(e) => e.stopPropagation()}
                className="relative z-[10000] w-full max-w-sm bg-white/95 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-glass-xl border border-zinc-900/10 text-center overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer text-zinc-500 hover:text-zinc-900 z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <AnimatePresence mode="wait">
                  {!hasPaid ? (
                    <motion.div
                      key="payment-step"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center space-y-4"
                    >
                      <div className="text-3xl">
                        {selectedCoffee ? selectedCoffee.emoji : '☕'}
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-lg font-extrabold tracking-tight text-zinc-900 uppercase">
                          {selectedCoffee ? `Buy Anurag a ${selectedCoffee.name}` : 'Support Anurag'}
                        </h4>
                        <p className="text-xs text-zinc-500 font-medium">
                          {selectedCoffee ? `Suggested: ${selectedCoffee.price}` : 'Scan or Pay using any UPI app'}
                        </p>
                      </div>

                      {/* QR Code Container */}
                      <div className="relative p-2.5 bg-white rounded-3xl border border-zinc-900/5 shadow-inner">
                        <img
                          src="/upi-qr.jpg"
                          alt="Anurag UPI QR Code"
                          className="w-48 h-48 rounded-2xl select-none object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 rounded-3xl border border-zinc-900/5 pointer-events-none" />
                      </div>

                      <div className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                        Scan with GPay, PhonePe, or Paytm
                      </div>

                      {/* UPI copy area */}
                      <div className="w-full flex items-center justify-between p-3 rounded-xl bg-black/[0.02] border border-zinc-900/5">
                        <span className="text-[11px] font-mono text-zinc-700 font-bold select-all">
                          {CONFIG.upiId}
                        </span>
                        <button
                          onClick={handleCopy}
                          className="p-1.5 rounded-lg hover:bg-black/5 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
                          title="Copy UPI ID"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Mobile direct deep link */}
                      {isMobile && (
                        <a
                          href={upiUri}
                          className="flex items-center justify-center space-x-2 py-3 w-full bg-zinc-900 text-white hover:brightness-95 text-xs font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(9,9,11,0.06)]"
                        >
                          <Smartphone className="w-4 h-4" />
                          <span>Pay via UPI App Directly</span>
                        </a>
                      )}

                      {/* Check Payment Completion Button */}
                      <button
                        onClick={() => setHasPaid(true)}
                        className="flex items-center justify-center space-x-2 py-3.5 w-full bg-gradient-to-r from-aurora-violet to-aurora-indigo text-white hover:brightness-95 text-xs font-black tracking-wide rounded-xl transition-all duration-300 shadow-md cursor-pointer uppercase"
                      >
                        <Heart className="w-4 h-4 fill-white animate-pulse" />
                        <span>I have completed the payment</span>
                      </button>

                      {/* International Fallback link */}
                      <a
                        href={CONFIG.kofiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-zinc-600 hover:text-zinc-900 transition-colors flex items-center space-x-1"
                      >
                        <span>Outside India? Support via Ko-fi</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="thank-you-step"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, type: 'spring', bounce: 0.25 }}
                      className="flex flex-col items-center space-y-5 py-6"
                    >
                      <motion.div
                        initial={{ rotate: -15, scale: 0.5 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-600"
                      >
                        <CheckCircle2 className="w-10 h-10" />
                      </motion.div>

                      <div className="space-y-2 text-center">
                        <h4 className="text-xl font-black tracking-tight text-zinc-900 uppercase">
                          Thanks for your support! 💖
                        </h4>
                        <p className="text-xs text-zinc-600 font-medium leading-relaxed px-2">
                          Your contribution makes a huge difference! It helps cover domain hosting, database APIs, and keeps open-source builds like OpportunityX online for students.
                        </p>
                      </div>

                      <button
                        onClick={() => setShowModal(false)}
                        className="mt-2 px-6 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer shadow-md"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
