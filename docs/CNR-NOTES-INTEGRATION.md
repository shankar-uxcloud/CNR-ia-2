# CNR Notes integration

CNR Notes (source repository: https://github.com/shankar-uxcloud/cnr-notes) is now represented inside the existing CNR-IA-2 application rather than being run as a second, parallel website.

## Integrated experience

- `#/cnr-notes` opens the CNR Notes hub, with direct entry points for Modules 1–5 and resource categories.
- `#/cnr-notes/module/1` through `#/cnr-notes/module/5` open the existing Academic Resource Vault filtered to that module.
- `#/resources` remains the full Academic Resource Vault.
- Legacy `#/materials` links from the source project resolve to the shared resource vault.
- The source project's five `BCV755B Module N.pdf` files are already represented in the destination repository's module-note catalogue; the identical Git blobs are reused instead of storing duplicate copies.

## Deliberately not copied

The source app's `src/lib/data.ts` explicitly marks its seeded answer/resource bodies as sample placeholders. Its `demo-store.ts` implements browser-only simulated sign-in, and the source auth/admin screens describe their own access controls as demo-only. The premium page also states that payments are disabled. These are not imported as production features or represented as real VTU content.

The source also uses TanStack Start/Router, React 19, Tailwind CSS 4 and a Supabase client requiring environment variables. CNR-IA-2 uses its existing React 18/Vite 5/Tailwind 3 client-side architecture and local study storage. The integration therefore reuses the destination's established routes, resource catalogue, bookmarks and document reader instead of replacing the application stack or introducing an unconfigured backend.

## Source and destination

- Source: https://github.com/shankar-uxcloud/cnr-notes
- Destination: https://github.com/shankar-uxcloud/CNR-ia-2


## Production authentication in CNR-IA-2

The standalone CNR Notes source contains a simulated browser-only login in `src/routes/auth.tsx`; it is not a production authentication implementation. CNR-IA-2 does not reuse that demo store, fake admin shortcut, sample entitlements or disabled payment flow. Instead, this integration adds the official `@supabase/supabase-js` client to the existing React 18/Vite 5 app.

### Authentication features

- Email/password signup and sign-in through Supabase Auth.
- Email verification using the configured Supabase email template.
- Password reset email and authenticated password update.
- Persistent sessions, refresh-token handling and session restoration through the Supabase client.
- Header account entry with the signed-in email and sign-out action.
- Hash routes: `#/auth`, `#/signup`, `#/reset-password` and `#/auth/callback`.
- Public learning routes remain public. CNR-IA-2 currently has no private cloud resources or account-owned cloud records, so no existing study route is artificially gated and no local progress is uploaded.

### Required environment

Create a local `.env.local` file (never commit it):

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

The app also accepts `VITE_SUPABASE_PUBLISHABLE_KEY` as the public-key variable. Use only the project's publishable/anon client key. Never use a service-role or secret key in a Vite variable because all `VITE_*` values are exposed to the browser.

For local development, restart Vite after changing environment variables. For GitHub Pages, add the same two values as repository Actions variables/secrets and expose them to the build step in the deployment workflow. The browser client key is public by design; keep project security dependent on Supabase Auth settings and database RLS, not on hiding that key.

### Supabase dashboard configuration

1. Create or select a Supabase project and enable Email provider under Authentication → Providers.
2. Configure the site URL to the deployed GitHub Pages app base URL, for example `https://shankar-uxcloud.github.io/CNR-ia-2/`.
3. Add the local Vite URL and the deployed app base URL to Authentication → URL Configuration → Redirect URLs. For the hash-router callback, allow the app base URL and its callback path pattern supported by your Supabase URL allow-list, e.g. `https://shankar-uxcloud.github.io/CNR-ia-2/**`; also add `http://localhost:5173/**` for local development.
4. Configure the email confirmation and password recovery templates to use the Supabase-provided confirmation/recovery URL so PKCE verification is completed by the official client.
5. Set an appropriate password policy, email rate limits and SMTP provider for production delivery. Supabase's default email service may be rate-limited.

### Deployment

The GitHub Pages workflow must build with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` available to Vite. Environment variables are embedded into the static client bundle at build time, so changing a repository variable requires a new build/deployment. No service-role credential is needed or permitted.

### Security and limitations

- Missing configuration is shown as an explicit setup error; there is no fallback/demo login.
- Supabase manages the session and tokens. The app does not store passwords or manually persist access tokens.
- The service worker bypasses authentication/API requests, authorization-bearing requests and OAuth/PKCE callback URLs; those responses are not placed in the offline cache.
- No cloud sync, profile table, payment, entitlement or admin feature is claimed or implemented. Existing bookmarks, progress, settings, backups and offline study features remain browser-local and are not changed by signing in.
- All current study content remains publicly accessible. If private resources or user-specific cloud records are added later, they must be backed by server-side checks and Supabase Row Level Security policies before any client-side route guard is considered a security boundary.
