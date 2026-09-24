import { useRef, useState } from "react";
import { Check, Loader2, Paperclip, Send, X } from "lucide-react";
import { z } from "zod";
import { useApi } from "@/hooks/useApi";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB

const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be under 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be under 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(5, { message: "Please enter a valid phone number" })
    .max(30, { message: "Phone number must be under 30 characters" }),
  message: z
    .string()
    .trim()
    .max(1000, { message: "Please keep your note under 1000 characters" }),
});

type FieldName = "fullName" | "email" | "phone" | "message" | "resume";
type Errors = { [K in FieldName]?: string | undefined };

const fieldClass =
  "h-12 w-full border border-border bg-background px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand";

interface Organization {
  whatsapp_no: string;
}

export function ApplicationForm({ roleTitle }: { roleTitle: string }) {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const fileInput = useRef<HTMLInputElement>(null);

  const { data: org } = useApi<Organization>("org/organization");
  const whatsappNo = org?.whatsapp_no;

  function update(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function pickResume(file: File | null) {
    if (!file) {
      setResume(null);
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setResume(null);
      if (fileInput.current) fileInput.current.value = "";
      setErrors((prev) => ({ ...prev, resume: "Please upload a file under 5 MB" }));
      return;
    }
    setResume(file);
    setErrors((prev) => ({ ...prev, resume: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = applicationSchema.safeParse(values);
    const nextErrors: Errors = {};

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
    }
    if (!resume) nextErrors.resume = "Please attach your CV or resume";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("sending");

    const formData = new FormData();
    formData.append("role_title", roleTitle);
    formData.append("full_name", values.fullName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("message", values.message);
    if (resume) {
      formData.append("resume", resume);
    }

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
      const response = await fetch(`${baseUrl}/career-applications/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setStatus("sent");

      // Redirect to WhatsApp after slight delay
      setTimeout(() => {
        const phoneNo = whatsappNo || "+9779800000000";
        const text = `Hello, I have submitted an application for the role of ${roleTitle}.\nName: ${values.fullName}\nEmail: ${values.email}\nPhone: ${values.phone}`;
        const waUrl = `https://wa.me/${phoneNo.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank");
      }, 500);

    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting. Please try again.");
      setStatus("idle");
    }
  }

  function reset() {
    setValues({ fullName: "", email: "", phone: "", message: "" });
    setResume(null);
    if (fileInput.current) fileInput.current.value = "";
    setErrors({});
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className="border border-border bg-card p-8 md:p-10">
        <div className="flex h-12 w-12 items-center justify-center bg-brand text-primary-foreground">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-6 font-display text-2xl uppercase">Application received</h3>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Thank you, {values.fullName.split(" ")[0]}. Your application for{" "}
          <span className="text-foreground">{roleTitle}</span> has been recorded with your
          CV. We have also opened a WhatsApp chat for you to directly message us. Our team reviews applications weekly.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-semibold transition hover:border-brand hover:text-brand"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-border bg-card p-8 md:p-10">
      <h2 className="font-display text-2xl uppercase">Apply for this role</h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Fill in your details and attach your CV. Fields marked with * are required. Upon submission, you will also be connected via WhatsApp.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Field label="Full name *" error={errors.fullName}>
          <input
            className={fieldClass}
            value={values.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            maxLength={100}
          />
        </Field>
        <Field label="Email *" error={errors.email}>
          <input
            className={fieldClass}
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={255}
          />
        </Field>
        <Field label="Phone *" error={errors.phone}>
          <input
            className={fieldClass}
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+977 ..."
            autoComplete="tel"
            maxLength={30}
          />
        </Field>
        <Field label="Resume / CV *" error={errors.resume}>
          <input
            ref={fileInput}
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="sr-only"
            onChange={(e) => pickResume(e.target.files?.[0] ?? null)}
          />
          <div className="flex items-stretch gap-2">
            <label
              htmlFor="resume"
              className="inline-flex h-12 cursor-pointer items-center gap-2 border border-border px-4 text-sm font-semibold transition hover:border-brand hover:text-brand"
            >
              <Paperclip className="h-4 w-4" /> Choose file
            </label>
            <span className="flex min-w-0 flex-1 items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{resume ? resume.name : "PDF or Word, max 5 MB"}</span>
              {resume && (
                <button
                  type="button"
                  onClick={() => pickResume(null)}
                  aria-label="Remove attached file"
                  className="shrink-0 text-muted-foreground transition hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </span>
          </div>
        </Field>
        <div className="md:col-span-2">
          <Field label="Why this role?" error={errors.message}>
            <textarea
              className="min-h-32 w-full resize-y border border-border bg-background p-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-brand"
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="A short note about your experience with machinery, tools or customers."
              maxLength={1000}
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 inline-flex h-12 items-center justify-center gap-2 bg-ink px-7 text-sm font-semibold text-primary-foreground transition hover:bg-brand disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Submit application <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">{label}</span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-2 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  );
}
