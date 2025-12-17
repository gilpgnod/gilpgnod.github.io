import { asyncErrorProcessor } from "./asyncErrorProcessor.js"

/**
 * @template PromiseType
 * @param {(() => Promise<PromiseType>) | Promise<PromiseType>
 *                                                          } callbackOrPromise
 * @param {PromiseType} errorValue
 */
export async function asyncTryCatch(callbackOrPromise, errorValue) {
 try {
  if (typeof callbackOrPromise === "function") {
   return await callbackOrPromise()
  } else {
   return await callbackOrPromise
  }
 } catch (error) {
  await asyncErrorProcessor(error)
  return errorValue
 }
}