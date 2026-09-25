import { useState } from "react";

export function ContactForm({
  title = "Send an enquiry",
  subtitle = "We generally respond within 24 hours.",
  className = "",
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(false);
    setError(false);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
      const res = await fetch(`${baseUrl}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone_no: data.phone_no,
          email: data.email,
          subject: data.subject || "Website Enquiry",
          message: data.message,
        }),
      });
      if (res.ok) {
        setSent(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-8 ${className}`}>
      <div className="mb-4">
        <h3 className="text-4xl font-display font-black tracking-tighter uppercase text-foreground">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground">
            Full Name
          </label>
          <input
            required
            name="name"
            placeholder="John Doe"
            className="w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
          />
        </div>
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground">
            Phone Number
          </label>
          <input
            required
            name="phone_no"
            type="tel"
            placeholder="+977 98..."
            className="w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
          />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground">
            Email Address
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder="john@example.com"
            className="w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
          />
        </div>
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground">
            Subject
          </label>
          <input
            required
            name="subject"
            placeholder="Machinery Quote"
            className="w-full border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-widest text-foreground">
          What are you looking for?
        </label>
        <textarea
          required
          name="message"
          rows={4}
          placeholder="Tell us about your requirements..."
          className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground/30 focus:border-foreground"
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex self-start items-center gap-2 text-sm font-bold uppercase tracking-widest text-background bg-foreground px-8 py-4 hover:bg-foreground/80 transition-colors"
      >
        Send Enquiry
      </button>

      {sent && (
        <div className="mt-4 border border-border p-6 text-center bg-muted/30">
          <p className="text-sm font-bold uppercase tracking-widest text-foreground">
            Thanks — your enquiry has been sent successfully. We will get back to you shortly.
          </p>
        </div>
      )}
      {error && (
        <div className="mt-4 border border-border p-6 text-center bg-red-500/10">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            There was an error sending your message. Please try again later.
          </p>
        </div>
      )}
    </form>
  );
}
