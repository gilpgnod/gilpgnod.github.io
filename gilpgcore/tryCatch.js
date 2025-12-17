import { errorProcessor } from "./errorProcessor.js"

/**
 * @template ReturnType
 * @param {() => ReturnType} callback
 * @param {ReturnType} errorValue
 */
export function tryCatch(callback, errorValue) {
 try {
  return callback()
 } catch (error) {
  errorProcessor(error)
  return errorValue
 }
}