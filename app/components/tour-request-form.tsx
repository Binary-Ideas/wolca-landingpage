"use client";

import { useState, type FormEvent } from "react";
import { useGHLFormSubmit } from "@/hooks/useGHLFormSubmit";

const gradeOptions = [
  "Preschool",
  "K5",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
];

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length === 0) return "";
  if (digits.length < 4) return digits;
  if (digits.length < 7) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function TourRequestForm() {
  const [phone, setPhone] = useState("");
  const { submitLead, isSubmitting, error, isSuccess } = useGHLFormSubmit();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const grade = String(formData.get("grade") ?? "").trim();

    const result = await submitLead({
      name,
      email,
      phone,
      grade,
    });

    if (result.success) {
      formElement.reset();
      setPhone("");
    }
  };

  return (
    <div className="card-surface p-6 sm:p-8">
      <h3 className="text-xl font-bold text-brand-navy">Request a Private Tour</h3>
      <p className="mt-2 text-sm text-slate-600">
        Submit your details and our admissions team will contact you.
      </p>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-1 text-sm font-semibold text-brand-navy">
          Parent Name
          <input
            required
            type="text"
            name="name"
            autoComplete="name"
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none"
            placeholder="Your full name"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-brand-navy">
          Email Address
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-brand-navy">
          Phone Number
          <input
            required
            type="tel"
            name="phone"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            disabled={isSubmitting}
            onChange={(event) => setPhone(formatPhoneNumber(event.target.value))}
            pattern={"\\(\\d{3}\\)\\s\\d{3}-\\d{4}"}
            maxLength={14}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none"
            placeholder="(555) 123-4567"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-brand-navy">
          Student Grade Interest
          <select
            name="grade"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-navy focus:outline-none"
            defaultValue="Preschool"
            disabled={isSubmitting}
          >
            {gradeOptions.map((grade) => (
              <option key={grade}>{grade}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isSubmitting ? "Submitting..." : "Schedule Your Private Tour Today"}
        </button>
        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        ) : null}
        {isSuccess ? (
          <p
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            Thanks! Your tour request has been received. Our admissions team will
            reach out soon.
          </p>
        ) : null}
      </form>
    </div>
  );
}
