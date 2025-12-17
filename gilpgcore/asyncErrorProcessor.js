import { errorProcessorDefault } from "./errorProcessor.js"

/**
 * @type {import("./AsyncErrorProcessorFunction.js")
 *                                                .AsyncErrorProcessorFunction}
 */
let _asyncErrorProcessor = asyncErrorProcessorDefault

/**
 * @param {import("./AsyncErrorProcessorFunction.js")
 *                    .AsyncErrorProcessorFunction} asyncErrorProcessorFunction
 */
export function provideAsyncErrorProcessor(asyncErrorProcessorFunction) {
 _asyncErrorProcessor = asyncErrorProcessorFunction
}

/**
 * @template {{message:string} | null} ErrorType
 * @param {ErrorType} error
 */
export async function asyncErrorProcessor(error) {
 return _asyncErrorProcessor(error)
}

/**
 * Logs an error in the console and shows its message property (if any) in an
 * alert dialog.
 * @param {{[s:string]: string} | null} error error description.
 */
export async function asyncErrorProcessorDefault(error) {
 errorProcessorDefault(error)
}