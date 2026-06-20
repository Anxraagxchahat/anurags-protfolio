// ============================================================
// Contact & social — LOCKED (doc 00 §6).
// The FormSubmit endpoint, subject template, captcha flag, the three response
// branches, and all messages MUST be preserved verbatim — this is real working
// backend behavior, not decoration. The Contact section (P6) reuses these.
// ============================================================

export const email = 'vermakumaranurag@gmail.com';

// FormSubmit AJAX config (preserve exactly)
export const form = {
  endpoint: 'https://formsubmit.co/ajax/vermakumaranurag@gmail.com',
  // _subject is templated with the sender name; _captcha disabled
  subjectTemplate: (name) => `New Portfolio Message from ${name}`,
  captcha: 'false',
  fields: ['name', 'email', 'message'],
  placeholders: {
    name: 'e.g. Elon Musk',
    email: 'name@company.com',
    message: 'Tell me about your product requirements...',
  },
  labels: {
    name: 'Name',
    email: 'Email Address',
    message: 'Your Message',
  },
  buttons: {
    idle: 'Transmit Message',
    submitting: 'Transmitting...',
  },
  // The three response states (success / activation-required / error)
  messages: {
    successTitle: 'Message Transmitted!',
    successBody: 'Thank you! Anurag will review your message and reach out shortly.',
    activationTitle: 'Activation Required!',
    // Rendered with the email highlighted + the "Activate Form" link emphasized
    activationBody:
      'FormSubmit has sent an activation email to vermakumaranurag@gmail.com. Please check your inbox (including spam) and click the "Activate Form" link to start receiving messages.',
    activationDismiss: 'Okay, got it',
    errorGeneric: 'Failed to send message. Please try again.',
    errorRequest: 'Failed to send message. Please try again or email directly.',
    errorNetwork: 'An error occurred. Please check your connection and try again.',
  },
};

// Magnet copy for the Contact left column
export const contactCopy = {
  heading: "Let's build something game-changing.",
  body:
    'Whether you want to discuss AI/ML microservices, full-stack architectures, student opportunity frameworks, or collaborate on OpportunityX, my inbox is always open.',
  responseTime: 'Response time: Typically under 4 hours.',
};

// Primary social rows shown in Contact (doc 00 §6). `icon` = lucide name or custom key.
export const socials = [
  { name: 'GitHub',   url: 'https://github.com/Anxraagxchahat',                    icon: 'github',   label: 'View Codebases' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/anurag-verma-388238246/',  icon: 'linkedin', label: "Let's Network" },
  { name: 'Email',    url: 'mailto:vermakumaranurag@gmail.com',                     icon: 'Mail',     label: 'Direct Drop' },
];

// Footer socials (doc 00 §6)
export const footerSocials = [
  { name: 'X (Twitter)', url: 'https://x.com/TheOpportunityX',          icon: 'twitter' },
  { name: 'Instagram',   url: 'https://www.instagram.com/pandaxchahat', icon: 'instagram' },
];

// Footer copy (doc 00 §6 / redesign plan §Footer)
export const footer = {
  tagline: 'Student Founder & Web Architect',
  copyright: '© 2026 Anurag Verma. All rights reserved. Made in record speed.',
  year: 2026,
};

export default { email, form, contactCopy, socials, footerSocials, footer };
