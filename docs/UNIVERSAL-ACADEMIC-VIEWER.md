# Universal Academic Material Viewer

The Resource Vault opens registered materials in an edge-to-edge reader.

## Supported preview routes

- **PDF:** embedded browser-native PDF viewer. Page navigation, text selection/search, zoom, rotation and page layout are supplied by the user's browser PDF implementation and may vary by browser.
- **PPT/PPTX and DOC/DOCX:** Microsoft Office web viewer embed. The file must be publicly reachable and the external Office viewer service must be available.
- **Google Drive resources:** Google Drive's own preview endpoint is used when a Drive file ID is registered.

## Study-library behaviour

- Resource bookmarks and recently opened materials are persisted in localStorage.
- The recent-material list provides a quick way to reopen recently studied resources.
- The reader supports browser fullscreen; press **F** to toggle fullscreen and **Esc** to close after leaving fullscreen.
- Original files remain accessible through **Open original**.

## Hosting and limitations

This is a static GitHub Pages application and does not upload documents to a conversion server. Browser-native PDF controls are isolated inside the browser's PDF viewer; the application cannot reliably read the current page, search index, or zoom state from a native/cross-origin PDF iframe. Office web previews depend on Microsoft's external service and public file access. Rendering fidelity, availability and controls therefore vary by browser and service and are not guaranteed offline.

Unsupported formats are not presented as if they were successfully rendered. Publicly hosted resources can still be downloaded, copied or screenshotted; an online preview is not DRM.
