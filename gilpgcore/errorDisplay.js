/**
 * @type {import("./MessageDisplayFunction.js").MessageDisplayFunction}
 */
let _errorDisplay = errorDisplayDefault

/**
 * @param {import("./MessageDisplayFunction.js").MessageDisplayFunction
 *                                                       } errorDisplayFunction
 */
export function provideErrorDisplay(errorDisplayFunction) {
 _errorDisplay = errorDisplayFunction
}

/**
 * @param {string} message
 */
export function errorDisplay(message) {
 _errorDisplay(message)
}

/**
 * @param {string} message
 */
export function errorDisplayDefault(message) {
 console.error(message)
}