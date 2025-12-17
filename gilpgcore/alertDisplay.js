/**
 * @type {import("./MessageDisplayFunction.js").MessageDisplayFunction}
 */
let _alertDisplay = alertDisplayDefault

/**
 * @param {import("./MessageDisplayFunction.js").MessageDisplayFunction
 *                                                       } alertDisplayFunction
 */
export function provideAlertDisplay(alertDisplayFunction) {
 _alertDisplay = alertDisplayFunction
}

/**
 * @param {string} message
 */
export function alertDisplay(message) {
 _alertDisplay(message)
}

/**
 * @param {string} message
 */
export function alertDisplayDefault(message) {
 console.log(message)
}