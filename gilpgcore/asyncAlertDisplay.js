import { alertDisplayDefault } from "./alertDisplay.js"

/**
 * @type {import("./AsyncMessageDisplayFunction.js").
 *                                                 AsyncMessageDisplayFunction}
 */
let _asyncAlertDisplay = asyncAlertDisplayDefault

/**
 * @param {import("./AsyncMessageDisplayFunction.js").
 *                       AsyncMessageDisplayFunction} asyncAlertDisplayFunction
 */
export function provideAsyncAlertDisplay(asyncAlertDisplayFunction) {
 _asyncAlertDisplay = asyncAlertDisplayFunction
}

/**
 * @param {string} message
 */
export async function asyncAlertDisplay(message) {
 return _asyncAlertDisplay(message)
}

/**
 * @param {string} message
 */
export async function asyncAlertDisplayDefault(message) {
 alertDisplayDefault(message)
}