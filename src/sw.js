import { manifest, version } from '@parcel/service-worker'

const VERSION = "2.0"

if (self instanceof ServiceWorkerGlobalScope) {
 self.addEventListener("install",
  (/** @type {ExtendableEvent} */ evt) => {
   console.log("El service worker se está instalando.")
   evt.waitUntil(cacheFill())
  })
 self.addEventListener("fetch", (/** @type {FetchEvent} */ evt) => {
  if (evt.request.method === "GET") {
   evt.respondWith(requestSearchInCache(evt))
  }
 })
 self.addEventListener("activate",
  () => console.log("El service worker está activo."))
}
async function cacheFill() {
 console.log("Intentando cargar caché:", version)
 const keys = await caches.keys()
 await Promise.all(keys.map(key => caches.delete(key)))
 const cache = await caches.open(version)
 await cache.addAll(manifest)
 console.log("Cache cargado:", version)
 console.log("Versión:", VERSION)
}
/**
 * @param {FetchEvent} evt
 */
async function requestSearchInCache(evt) {
 const cache = await caches.open(version)
 const request = evt.request
 const response = await cache.match(request, { ignoreSearch: true })
 if (response === undefined) {
  return fetch(request)
 } else {
  return response
 }
}