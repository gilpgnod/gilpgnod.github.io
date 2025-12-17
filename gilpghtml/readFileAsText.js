import { promiseNew } from "/gilpgcore/promiseNew.js"
import {
 fileReadNotTextTemplate
} from "./i18n/template/fileReadNotTextTemplate.js"

/**
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readFileAsText(file) {

 return promiseNew((resolve, reject) => {

  const reader = new FileReader()

  reader.onload = () => {
   if (typeof reader.result === "string") {
    resolve(reader.result)
   } else {
    reject(fileReadNotTextTemplate(file))
   }
  }

  reader.onerror = () => reject(reader.error)

  reader.readAsText(file)

 })

}