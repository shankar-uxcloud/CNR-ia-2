# Smart connectivity notifications

The app-level `ConnectivityToast` listens for browser `online` and `offline` events and uses `navigator.onLine` as its initial state. It shows one transient offline notice when the app loads while the browser reports no network connection, then shows notices only for actual online/offline transitions. Duplicate events in the same state are ignored.

Each notice auto-dismisses after 3.6 seconds. A newer transition replaces the previous notice and restarts the timer. Users can also dismiss a notice manually. Event listeners and timers are cleaned up when the component unmounts.

The connectivity notification is mounted globally in `App.jsx`. `PWAStatus` remains responsible only for the PWA installation lifecycle (`beforeinstallprompt` and `appinstalled`). This feature does not reload the page or modify the service worker, cache strategy, routing, localStorage, or GitHub Pages configuration.

## Browser connectivity caveat

`navigator.onLine` and browser connectivity events indicate the browser's network connection state, not guaranteed reachability of every internet service. A captive portal, DNS failure, or unavailable origin can still occur while `navigator.onLine` is true. The notice therefore describes browser-reported connectivity and does not claim all app functionality is available offline.

## Accessibility and styling

The toast uses a polite live region, a labelled dismiss button, theme-aware semantic variables, mobile safe-area positioning, reduced-motion support, reduced-transparency support, and forced-colors styling.

## Validation

Automated tests cover transition deduplication, notice duration, event ownership, global mounting, and preservation of the separate PWA install lifecycle. Browser checks should still verify initial offline load, repeated offline events, reconnect/disconnect cycles, light/dark themes, and mobile/desktop positioning.
