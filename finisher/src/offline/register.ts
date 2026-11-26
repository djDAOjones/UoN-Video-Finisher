/**
 * Registers the service worker that keeps the app for offline use (spec §11,
 * VH-161).
 *
 * Silent by design: offline use is a property of the page, not a feature with
 * a control or a message, and a page that cannot register — Firefox in a
 * private window, an insecure origin, a browser with service workers turned
 * off — works exactly as before, online. A failure is logged, never shown.
 *
 * Never under the dev server: a worker kept from a production build would
 * answer the dev server's requests with stale files, and Vite's modules are
 * not files a list could name.
 */

/** The one part of `navigator.serviceWorker` this needs; a stand-in in tests. */
export interface ServiceWorkerHost {
  register(scriptUrl: string): Promise<unknown>
}

export interface OfflineRegistration {
  /** `import.meta.env.DEV`. */
  readonly dev: boolean
  /** `navigator.serviceWorker`, absent where the browser has none. */
  readonly container: ServiceWorkerHost | undefined
  /** The worker's URL: the build's base and `__OFFLINE_WORKER_FILE__`. */
  readonly scriptUrl: string
  /** Where a refusal goes: the logger. */
  readonly onError: (error: unknown) => void
}

/**
 * Registers the worker, unless this is the dev server or there is none to have.
 *
 * Called once the page has loaded, so the worker's first fetches of the
 * branding masters do not compete with the page's own.
 *
 * @returns Whether a registration was asked for.
 */
export function registerOfflineCache({
  dev,
  container,
  scriptUrl,
  onError,
}: OfflineRegistration): boolean {
  if (dev || container === undefined) return false
  container.register(scriptUrl).catch(onError)
  return true
}
