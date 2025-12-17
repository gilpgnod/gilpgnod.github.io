import {
 confirmFunctionUndefinedText
} from "./i18n/text/confirmFunctionUndefinedText.js"

/**
 * @type {import("./ConfirmDisplayFunction.js").
 *                                          ConfirmDisplayFunction | undefined}
 */
let _confirmDisplay = undefined

/**
 * @param {import("./ConfirmDisplayFunction.js").
 *                               ConfirmDisplayFunction} confirmDisplayFunction
 */
export function provideConfirmDisplay(confirmDisplayFunction) {
 _confirmDisplay = confirmDisplayFunction
}

/**
 * @param {string} message
 */
export function confirmDisplay(message) {
 if (_confirmDisplay === undefined)
  throw new Error(confirmFunctionUndefinedText())
 return _confirmDisplay(message)
}