import {
 confirmFunctionUndefinedText
} from "./i18n/text/confirmFunctionUndefinedText.js"

/**
 * @type {import("./AsyncConfirmDisplayFunction.js").
 *                                     AsyncConfirmDisplayFunction | undefined}
 */
let _asyncConfirmDisplay = undefined

/**
 * @param {import("./AsyncConfirmDisplayFunction.js").
 *                     AsyncConfirmDisplayFunction} asyncConfirmDisplayFunction
 */
export function provideAsyncConfirmDisplay(asyncConfirmDisplayFunction) {
 _asyncConfirmDisplay = asyncConfirmDisplayFunction
}

/**
 * @param {string} message
 */
export async function asyncConfirmDisplay(message) {
 if (_asyncConfirmDisplay === undefined)
  throw new Error(confirmFunctionUndefinedText())
 return _asyncConfirmDisplay(message)
}