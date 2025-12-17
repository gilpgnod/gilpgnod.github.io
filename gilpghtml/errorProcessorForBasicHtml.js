import { errorText } from "/gilpgcore/i18n/text/errorText.js"
import { errorDisplay } from "/gilpgcore/errorDisplay.js"

/**
 * Logs an error in the console and shows its message property (if any) in an
 * alert dialog.
 * @param {{[s:string]: string} | null} error error description.
 */
export function errorProcessorForBasicHtml(error) {

 if (error === null) {

  const errorMessage = errorText()
  console.error(errorMessage)
  errorDisplay(errorMessage)

 } else {

  console.error(error)
  if (Object.getOwnPropertyNames(error).includes("message")) {
   errorDisplay(error.message)
  }

 }

}