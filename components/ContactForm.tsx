"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      status: "new",
    };

    const response = await fetch("/api/contact-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setState("error");
      return;
    }

    event.currentTarget.reset();
    setState("success");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
      <input
        className="w-full rounded-full border-2 border-[#721011]/20 bg-white px-5 py-4 text-[#721011] outline-none transition focus:border-[#D5AF34]"
        name="name"
        placeholder="Name*"
        required
      />
      <input
        className="w-full rounded-full border-2 border-[#721011]/20 bg-white px-5 py-4 text-[#721011] outline-none transition focus:border-[#D5AF34]"
        name="email"
        placeholder="Email*"
        required
        type="email"
      />
      <input
        className="w-full rounded-full border-2 border-[#721011]/20 bg-white px-5 py-4 text-[#721011] outline-none transition focus:border-[#D5AF34]"
        name="phone"
        placeholder="Phone"
        type="tel"
      />
      <textarea
        className="min-h-40 w-full rounded-3xl border-2 border-[#721011]/20 bg-white px-5 py-4 text-[#721011] outline-none transition focus:border-[#D5AF34]"
        name="message"
        placeholder="Message*"
        required
      />
      <button
        className="rounded-full bg-[#721011] px-8 py-4 font-heading text-lg font-bold text-[#FEF2F2] transition hover:bg-[#5a0d0d] disabled:cursor-wait disabled:opacity-70"
        disabled={state === "submitting"}
        type="submit"
      >
        {state === "submitting" ? "Sending..." : "Send Message"}
      </button>
      {state === "success" && (
        <p className="font-medium text-[#721011]">Thanks. We have received your message.</p>
      )}
      {state === "error" && (
        <p className="font-medium text-[#721011]">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
