"use client";
import { useForm, ValidationError } from "@formspree/react";
import { Send, CheckCircle } from "lucide-react";

const inputClass = `
  w-full bg-raised border border-rule rounded-sm px-3.5 py-3
  text-sm text-ink placeholder:text-ink-3
  focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-wash
  transition-colors duration-150
`;

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xojyqrny");

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 border border-rule rounded bg-raised">
        <CheckCircle size={32} className="text-ok" />
        <div className="text-center">
          <p className="font-display font-semibold text-ink text-lg">Message sent!</p>
          <p className="text-sm text-ink-3 mt-1">
            I&apos;ll get back to you soon. <span className="text-accent">♥</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="contact-name"
          className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-3 mb-1.5"
        >
          Your Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          placeholder="e.g. Bruno Mars"
          className={inputClass}
        />
        <ValidationError
          field="name"
          errors={state.errors}
          className="text-xs text-accent mt-1 block"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-3 mb-1.5"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
        <ValidationError
          field="email"
          errors={state.errors}
          className="text-xs text-accent mt-1 block"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block font-mono text-xs uppercase tracking-[0.12em] text-ink-3 mb-1.5"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="What's on your mind?"
          className={`${inputClass} resize-none`}
        />
        <ValidationError
          field="message"
          errors={state.errors}
          className="text-xs text-accent mt-1 block"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-ink text-bg text-sm font-semibold hover:bg-accent transition-colors duration-150 disabled:opacity-60"
      >
        {state.submitting ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-bg border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={14} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
