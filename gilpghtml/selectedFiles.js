import { inputNotOfTypeFile } from "./i18n/text/inputNotOfTypeFileText.js"

/**
 * Returns the selected file from an input type="file".
 * @param {HTMLInputElement} input analyzed input.
 * @returns {FileList} returns the selected files list.
 * @throws {Error} if input isn't of type "file" 
 */
export function selectedFiles(input) {
 if (input.type !== "file")
  throw new Error(inputNotOfTypeFile())
 const files = input.files
 if (files === null)
  throw new Error(inputNotOfTypeFile())
 return files
}