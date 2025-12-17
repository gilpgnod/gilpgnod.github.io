import { asyncErrorDisplay } from "/gilpgcore/asyncErrorDisplay.js"
import { errorText } from "/gilpgcore/i18n/text/errorText.js"

/**
 * Logs an error in the console and shows its message property (if any) in an
 * alert dialog.
 * @param {{[s:string]: string} | null} error error description.
 */
export async function asyncErrorProcessorForBasicHtml(error) {

 if (error === null) {

  const errorMessage = errorText()
  console.error(errorMessage)
  await asyncErrorDisplay(errorMessage)

 } else {

  console.error(error)
  if (Object.getOwnPropertyNames(error).includes("message")) {
   await asyncErrorDisplay(error.message)
  }

 }

}