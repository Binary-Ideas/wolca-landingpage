import { NextResponse } from "next/server";

const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";
const GHL_API_VERSION = "2021-07-28";
const LANDING_SOURCE = "WOLCA Private Tour Landing Page";
const SERVICE_TYPE = "Private Tour Request";
const PRIMARY_TAG = "wolca_organic";

const allowedGrades = new Set([
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
]);

type LeadFormPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  grade?: unknown;
};

type ValidationResult =
  | {
      ok: true;
      data: {
        name: string;
        email: string;
        phone: string;
        grade: string;
      };
    }
  | {
      ok: false;
      message: string;
      field?: "name" | "email" | "phone" | "grade" | "payload";
    };

type GhlCustomField = {
  id: string;
  value: string;
};

function getEnvValue(key: string): string | null {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    return null;
  }

  return value.trim();
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePayload(payload: LeadFormPayload): ValidationResult {
  if (!payload || typeof payload !== "object") {
    return { ok: false, message: "Invalid request payload.", field: "payload" };
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const phoneInput = typeof payload.phone === "string" ? payload.phone : "";
  const grade = typeof payload.grade === "string" ? payload.grade.trim() : "";
  const normalizedPhone = normalizePhone(phoneInput);

  if (!name) {
    return { ok: false, message: "Name is required.", field: "name" };
  }

  if (!email || !isValidEmail(email)) {
    return {
      ok: false,
      message: "A valid email address is required.",
      field: "email",
    };
  }

  if (normalizedPhone.length !== 10) {
    return {
      ok: false,
      message: "A valid 10-digit phone number is required.",
      field: "phone",
    };
  }

  if (!allowedGrades.has(grade)) {
    return {
      ok: false,
      message: "Please select a valid grade option.",
      field: "grade",
    };
  }

  return {
    ok: true,
    data: {
      name,
      email: email.toLowerCase(),
      phone: normalizedPhone,
      grade,
    },
  };
}

function parseUnknownError(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Unexpected server error.";
}

function parseGhlError(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "GHL request failed.";
  }

  const maybeMessage = (data as { message?: unknown }).message;
  if (typeof maybeMessage === "string" && maybeMessage.trim() !== "") {
    return maybeMessage;
  }

  const maybeError = (data as { error?: unknown }).error;
  if (typeof maybeError === "string" && maybeError.trim() !== "") {
    return maybeError;
  }

  return "GHL request failed.";
}

export async function POST(request: Request) {
  const privateToken = getEnvValue("GHL_PRIVATE_TOKEN");
  const locationId = getEnvValue("GHL_LOCATION_ID");
  const gradeFieldId = getEnvValue("GHL_CF_GRADE_INTEREST");

  if (!privateToken || !locationId || !gradeFieldId) {
    return NextResponse.json(
      {
        success: false,
        error: "Server is missing required GHL configuration.",
      },
      { status: 500 }
    );
  }

  let json: LeadFormPayload;
  try {
    json = (await request.json()) as LeadFormPayload;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid JSON payload.",
      },
      { status: 400 }
    );
  }

  const validated = validatePayload(json);
  if (!validated.ok) {
    return NextResponse.json(
      {
        success: false,
        error: validated.message,
        field: validated.field,
      },
      { status: 400 }
    );
  }

  const { firstName, lastName } = splitName(validated.data.name);
  const serviceTypeFieldId = getEnvValue("GHL_CF_SERVICE_TYPE");
  const landingSourceFieldId = getEnvValue("GHL_CF_LANDING_SOURCE");

  const customFields: GhlCustomField[] = [
    {
      id: gradeFieldId,
      value: validated.data.grade,
    },
  ];

  if (serviceTypeFieldId) {
    customFields.push({
      id: serviceTypeFieldId,
      value: SERVICE_TYPE,
    });
  }

  if (landingSourceFieldId) {
    customFields.push({
      id: landingSourceFieldId,
      value: LANDING_SOURCE,
    });
  }

  const upsertPayload = {
    locationId,
    firstName,
    lastName,
    email: validated.data.email,
    phone: validated.data.phone,
    source: LANDING_SOURCE,
    tags: [PRIMARY_TAG],
    customFields,
  };

  try {
    const response = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${privateToken}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upsertPayload),
      cache: "no-store",
    });

    const responseData = (await response.json().catch(() => null)) as
      | {
          contact?: { id?: string };
          id?: string;
          isNew?: boolean;
          new?: boolean;
          message?: string;
          error?: string;
        }
      | null;

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: parseGhlError(responseData),
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        contactId: responseData?.contact?.id ?? responseData?.id ?? null,
        isNew: Boolean(responseData?.isNew ?? responseData?.new ?? false),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: parseUnknownError(error),
      },
      { status: 500 }
    );
  }
}
