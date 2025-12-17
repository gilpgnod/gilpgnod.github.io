import { selectorNotFound } from "./i18n/template/selectorNotFound.js"

/**
 * @template {HTMLElement} T
 * @param {Element | Document | ShadowRoot} parent
 * @param {string} selector
 * @returns {T}
 */
export function querySelector(parent, selector) {
 /**
  * @type {T | null}
  */
 const element = parent.querySelector(selector)
 if (element === null) throw new Error(selectorNotFound(selector))
 return element
}
