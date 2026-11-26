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

