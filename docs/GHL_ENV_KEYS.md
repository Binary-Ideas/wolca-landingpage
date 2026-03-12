# GHL Environment Keys Reference

This file explains the environment keys used by the WOLCA GHL integration.

The values are defined in `.env.local.example` and read by `app/api/ghl-lead/route.ts`.

## Required Keys

| Key | What it is | Where to get it | Used for |
|---|---|---|---|
| `GHL_PRIVATE_TOKEN` | Private Integration API token from your GHL sub-account | GHL -> Settings -> Private Integrations -> Create Integration | Authenticates server requests to GHL API |
| `GHL_LOCATION_ID` | Your GHL location/sub-account ID | GHL URL: `.../location/{LOCATION_ID}/...` | Tells GHL which location receives the lead |
| `GHL_CF_GRADE_INTEREST` | Custom field ID for student grade interest | GHL -> Settings -> Custom Fields (or `GET /locations/{id}/customFields`) | Maps form `grade` into GHL custom field |
| `GHL_PRIMARY_TAG` | Lead tag value to apply on upsert | Choose the tag name used by your workflow trigger (example: `wolca_organic`) | Controls which tag is added in `tags: [value]` for each submitted lead |

If any required key is missing, `/api/ghl-lead` returns a server config error and does not submit the lead.
If `GHL_PRIMARY_TAG` is missing, the API falls back to `wolca_organic`.

## Optional Keys

| Key | What it is | Used for | Behavior if empty |
|---|---|---|---|
| `GHL_CF_SERVICE_TYPE` | Custom field ID for service type | Writes static value `Private Tour Request` | Field is skipped |
| `GHL_CF_LANDING_SOURCE` | Custom field ID for landing source | Writes static value `WOLCA Private Tour Landing Page` | Field is skipped |

## Example `.env.local`

```env
GHL_PRIVATE_TOKEN=ptk_xxxxxxxxxxxxxxxxx
GHL_LOCATION_ID=abc123xyz
GHL_CF_GRADE_INTEREST=QwErTy123
GHL_PRIMARY_TAG=wolca_organic
GHL_CF_SERVICE_TYPE=AsDfGh456
GHL_CF_LANDING_SOURCE=ZxCvBn789
```

## Important Notes

- Keep these server-side only. Never expose them in client components.
- Do not commit real token values to Git.
- After changing env values, restart `npm run dev`.
- Set the same keys in Vercel for Development, Preview, and Production.
- Set your GHL workflow trigger tag to the same value as `GHL_PRIMARY_TAG`.
