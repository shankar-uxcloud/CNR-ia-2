# CNR Academic Resource Vault — dual-source publishing

The vault supports two independent public file locations:

1. **Repository / GitHub Pages** — place PDFs under `public/resources/`. Add the path relative to `public/` as `repositoryPath` in `src/data/resourceCatalog.js`. Example: `resources/notes/module-1/module-1-notes.pdf`.
2. **Google Drive** — set each file to General access → Anyone with the link → Viewer, then add its share URL as `driveUrl`.

A resource may have either source or both. When both exist, the vault previews the repository copy and offers separate repository and Drive actions. Existing `url` entries remain supported for backward compatibility.

## Suggested folder layout

- `public/resources/notes/module-1/` through `module-5/`
- `public/resources/presentations/module-1/` through `module-5/`
- `public/resources/pyqs/`
- `public/resources/mqps/`
- `public/resources/reference/`

## Important

Do not publish a catalogue entry until its repository file exists or its Drive link has been verified. Keep original papers distinct from model papers and label third-party material honestly. GitHub Pages is public hosting: only commit files you have permission to redistribute. For large PDFs, GitHub repository storage and bandwidth limits matter; Google Drive can remain the primary copy while the repository hosts smaller or frequently used resources.
