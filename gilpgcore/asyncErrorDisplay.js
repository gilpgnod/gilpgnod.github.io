import { errorDisplayDefault } from "./errorDisplay.js"

/**
 * @type {import("./AsyncMessageDisplayFunction.js").
 *                                                 AsyncMessageDisplayFunction}
 */
let _asyncErrorDisplay = asyncErrorDisplayDefault

/**
 * @param {import("./AsyncMessageDisplayFunction.js").
 *                       AsyncMessageDisplayFunction} asyncErrorDisplayFunction
 */
export function provideAsyncErrorDisplay(asyncErrorDisplayFunction) {
 _asyncErrorDisplay = asyncErrorDisplayFunction
}

/**
 * @param {string} message
 */
export async function asyncErrorDisplay(message) {
 return _asyncErrorDisplay(message)
}

/**
 * @param {string} message
 */
export async function asyncErrorDisplayDefault(message) {
 errorDisplayDefault(message)
}