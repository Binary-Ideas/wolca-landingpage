# GHL PRIVATE INTEGRATION GUIDE - WOLCA PRIVATE TOUR LEADS

> **Client:** Word of Life Christian Academy (WOLCA)  
> **Service:** Private Tour Request (Admissions)  
> **Stack:** Next.js (App Router) + Vercel + GHL Private Integration API v2  
> **Primary tag added by API payload:** `wolca_organic`

---

## ARCHITECTURE OVERVIEW

```text
[Tour Request Form] -> [Vercel API Route] -> [GHL Contacts Upsert API]
        |                     |                          |
   Parent submits        Server-side token          Creates/updates contact
   name, email,          (never in browser)         + writes custom fields
   phone, grade                                     + adds wolca_organic tag
                                                            |
                                                     [Admissions Workflow Trigger]
                                                     Trigger: Contact Tag Added
                                                     Filter: wolca_organic
```

**Why this architecture**
- Private Integration token stays server-side
- GHL upsert handles create/update in one call
- Tag is applied in the same request that saves lead data
- No Zapier or webhook bridge is required

---

## STEP 1: CREATE THE PRIVATE INTEGRATION IN GHL

1. Go to **GHL Sub-Account -> Settings -> Private Integrations**
   - If hidden, enable in **Settings -> Labs**
2. Click **Create New Integration**
3. Suggested name: `WOLCA Private Tour Form`
4. Suggested description: `Custom Next.js private tour form integration for WOLCA admissions`
5. Select permissions:
   - `contacts.write` (required for upsert + tags)
   - `contacts.readonly` (required for dedupe during upsert)
   - `locations/customFields.readonly` (required to lookup custom field IDs)
6. Create the integration and copy the token immediately
   - GHL shows the token once
   - Store securely for Vercel env vars

---

## STEP 2: GET CUSTOM FIELD IDS YOU WILL MAP FROM THE FORM

The form in this project collects:
- `name`
- `email`
- `phone`
- `grade`

GHL uses internal custom field **IDs**, not display labels.

### Recommended WOLCA custom fields
- `wolca_grade_interest` (required mapping from `grade`)
- `wolca_service_type` (recommended static value: `Private Tour Request`)
- `wolca_landing_source` (optional static value: `WOLCA Private Tour Landing Page`)

### Pull IDs via API (recommended)

```bash
curl -X GET "https://services.leadconnectorhq.com/locations/{YOUR_LOCATION_ID}/customFields" \
  -H "Authorization: Bearer {YOUR_PRIVATE_TOKEN}" \
  -H "Version: 2021-07-28"
```

Find each field by key/name and copy its `id`.

### Pull IDs via UI
1. Go to **Settings -> Custom Fields**
2. Open each field
3. Copy the internal field ID

---

## STEP 3: CONFIGURE ENVIRONMENT VARIABLES

Set these in Vercel project settings and locally in `.env.local`:

| Variable | Required | Purpose |
|---|---|---|
| `GHL_PRIVATE_TOKEN` | Yes | Private Integration API token |
| `GHL_LOCATION_ID` | Yes | GHL location/sub-account ID |
| `GHL_CF_GRADE_INTEREST` | Yes | Custom field ID for grade interest |
| `GHL_CF_SERVICE_TYPE` | No | Custom field ID for service type |
| `GHL_CF_LANDING_SOURCE` | No | Custom field ID for landing source |

**Notes**
- Set values for Development, Preview, and Production
- Optional custom field vars can be omitted if those fields do not exist

---

## STEP 4: API ROUTE BEHAVIOR (`/api/ghl-lead`)

The route should:
1. Validate required inputs (`name`, `email`, `phone`, `grade`)
2. Validate grade value against allowed options from the form
3. Split `name` into `firstName` and `lastName`
4. Normalize phone digits before sending to GHL
5. Call `POST /contacts/upsert` with:
   - contact basics (`firstName`, `lastName`, `email`, `phone`)
   - mapped custom fields
   - static tag `wolca_organic`
   - source string `WOLCA Private Tour Landing Page`
6. Return a clean success/error payload to the frontend

### Example GHL payload shape

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "4175550123",
  "source": "WOLCA Private Tour Landing Page",
  "tags": ["wolca_organic"],
  "customFields": [
    { "id": "GHL_CF_GRADE_INTEREST_ID", "value": "3rd Grade" },
    { "id": "GHL_CF_SERVICE_TYPE_ID", "value": "Private Tour Request" },
    { "id": "GHL_CF_LANDING_SOURCE_ID", "value": "WOLCA Private Tour Landing Page" }
  ]
}
```

If optional fields are not configured, omit those custom field objects.

---

## STEP 5: FRONTEND FORM WIRING

Use a submit hook that posts to `/api/ghl-lead` and exposes:
- `submitLead(payload)`
- `isSubmitting`
- `isSuccess`
- `error`

Map form values exactly:

```tsx
const payload = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  grade: formData.grade,
};
```

### Allowed grade values (must match form options)
- `Preschool`
- `K5`
- `1st Grade`
- `2nd Grade`
- `3rd Grade`
- `4th Grade`
- `5th Grade`
- `6th Grade`
- `7th Grade`
- `8th Grade`

Keep API validation list aligned with the form list.

---

## STEP 6: UPDATE WORKFLOW TRIGGER IN GHL

If an existing workflow is still tied to Facebook Lead Form triggers, replace it.

### Updated admissions trigger
- Trigger type: **Contact Tag**
- Tag: `wolca_organic`
- Event: **Added**

When `/api/ghl-lead` upserts the contact and applies `wolca_organic`, this workflow fires immediately.

### Tag step inside workflow
- If the workflow currently adds `wolca_organic` again, remove that step
- Duplicate tag adds are generally harmless but unnecessary

---

## STEP 7: TESTING CHECKLIST

### Local testing
1. Add real GHL credentials to `.env.local`
2. Run `npm run dev`
3. Submit from the WOLCA tour form
4. Verify in GHL:
   - Contact created or updated
   - Grade custom field is correct
   - `wolca_organic` tag is present
   - Admissions workflow executed

### Test scenarios

| Scenario | Name | Grade | Expected |
|---|---|---|---|
| New lead | New parent email | `K5` | New contact + grade set + tag applied + workflow fired |
| Existing lead | Existing parent email | `3rd Grade` | Existing contact updated + grade updated + tag present + workflow fired |
| Validation fail | Missing phone | any | API returns 400 and no GHL write |
| Validation fail | Invalid grade value | custom text | API returns 400 and no GHL write |

### Production testing
1. Deploy to Vercel
2. Confirm env vars in Production
3. Submit one live lead
4. Verify full flow from form submit to admissions follow-up workflow

---

## SECURITY NOTES

- Token is never exposed to client-side code
- Input validation blocks malformed writes
- Same-origin API route avoids custom CORS complexity
- Monitor GHL API limits (100 requests per 10 seconds per app per location)
- Rotate private token periodically and update env vars

---

## FILE MANIFEST

| File | Purpose |
|---|---|
| `app/api/ghl-lead/route.ts` | Receives validated lead form payload and upserts contact in GHL |
| `hooks/useGHLFormSubmit.ts` | Frontend submit hook with loading/success/error state |
| `app/components/tour-request-form.tsx` | Tour form UI + submit integration |
| `.env.local.example` | Environment variable template for local setup |

---

## QUICK WF TRIGGER REFERENCE

```text
Workflow: WOLCA Admissions Lead Intake
Step 1 trigger:
- Type: Contact Tag
- Tag: wolca_organic
- Event: Added

This trigger runs whenever the landing page API upsert adds wolca_organic.
```
