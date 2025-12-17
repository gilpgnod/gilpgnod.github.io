import {
 serviceWorkerRegisteredText
} from "./i18n/text/serviceWorkerRegisteredText.js"

/**
 * @param {Promise<ServiceWorkerRegistration>} registrationPromise
 */
export function serviceWorkerRegister(registrationPromise) {
 registrationPromise.then(registration => {
  console.log(serviceWorkerRegisteredText(), registration)
 })
  .catch(error => console.error(error))
}