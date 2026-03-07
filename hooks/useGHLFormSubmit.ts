"use client";

import { useState } from "react";

export type LeadFormPayload = {
  name: string;
  email: string;
  phone: string;
  grade: string;
};

type SubmitSuccess = {
  success: true;
  contactId: string | null;
  isNew: boolean;
};

type SubmitFailure = {
  success: false;
  error: string;
  field?: string;
};

export type SubmitLeadResult = SubmitSuccess | SubmitFailure;

function getErrorMessage(value: unknown): string {
  if (value && typeof value === "object" && "error" in value) {
    const maybeError = (value as { error?: unknown }).error;
    if (typeof maybeError === "string" && maybeError.trim() !== "") {
      return maybeError;
    }
  }

  return "Unable to submit your request right now. Please try again.";
}

function isSuccessResponse(value: unknown): value is SubmitSuccess {
  return (
    value !== null &&
    typeof value === "object" &&
    "success" in value &&
    (value as { success: boolean }).success === true
  );
}

export function useGHLFormSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLead = async (payload: LeadFormPayload): Promise<SubmitLeadResult> => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setError(null);

    try {
      const response = await fetch("/api/ghl-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => null)) as unknown;

      if (!response.ok || !isSuccessResponse(data)) {
        const message = getErrorMessage(data);
        const field =
          data && typeof data === "object" && "field" in data
            ? (data as { field?: string }).field
            : undefined;

        setError(message);

        return {
          success: false,
          error: message,
          field,
        };
      }

      setIsSuccess(true);
      return data;
    } catch {
      const message = "Unable to submit your request right now. Please try again.";
      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitLead,
    isSubmitting,
    isSuccess,
    error,
  };
}
