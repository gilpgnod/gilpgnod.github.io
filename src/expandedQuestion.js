// @ts-nocheck
{
 const ____output = document.getElementById("____output")
 const ___log = console.log
 const WAIT_TIME = 300

 /**
 * @param {string} message
 * @returns {Promise<string>}
 */
 window.question = async function question(message) {
  return new Promise((resolve, reject) => {
   setTimeout(
    () => {
     try {
      const answer = prompt(message) || ""
      ___log("%c" + message + answer, "color:blue;font-style:italic")
      if (____output) {
       const div = ____output.appendChild(document.createElement("div"))
       div.classList.add("log-line", "type-question")
       div.textContent = message + answer
      }
      setTimeout(() => resolve(answer), WAIT_TIME)
     } catch (e) {
      reject(e)
     }
    },
    WAIT_TIME
   )
  })
 }
 /**
  * @param {string} message
 * @returns {Promise<number>}
  */
 window.questionInt = async function questionInt(message) {
  return new Promise((resolve, reject) => {
   setTimeout(
    () => {
     try {
      const answer = parseInt(prompt(message), 10)
      ___log("%c" + message + answer, "color:blue;font-style:italic")
      if (____output) {
       const div = ____output.appendChild(document.createElement("div"))
       div.classList.add("log-line", "type-question")
       div.textContent = message + answer
      }
      setTimeout(() => resolve(answer), WAIT_TIME)
     } catch (e) {
      reject(e)
     }
    },
    WAIT_TIME
   )
  })
 }
 /**
  * @param {string} message
  */
 window.questionFloat = async function questionFloat(message) {
  return new Promise((resolve, reject) => {
   setTimeout(
    () => {
     try {
      const answer = parseFloat(prompt(message))
      ___log("%c" + message + answer, "color:blue;font-style:italic")
      if (____output) {
       const div = ____output.appendChild(document.createElement("div"))
       div.classList.add("log-line", "type-question")
       div.textContent = message + answer
      }
      setTimeout(() => resolve(answer), WAIT_TIME)
     } catch (e) {
      reject(e)
     }
    },
    WAIT_TIME
   )
  })
 }
 window.clear = async function clear() {
  return new Promise((resolve, reject) => {
   setTimeout(
    () => {
     try {
      console.clear()
      setTimeout(() => resolve(undefined), WAIT_TIME)
     } catch (e) {
      reject(e)
     }
    },
    WAIT_TIME
   )
  })
 }
 /**
  * @param {any[]} args
  */
 window.log = async function log(...args) {
  return new Promise((resolve, reject) => {
   setTimeout(
    () => {
     try {
      console.log(...args)
      setTimeout(() => resolve(undefined), WAIT_TIME)
     } catch (e) {
      reject(e)
     }
    },
    WAIT_TIME
   )
  })
 }
 /** @param {any[]} args */
 window.error = async function error(...args) {
  return new Promise((resolve, reject) => {
   setTimeout(
    () => {
     try {
      console.error(...args)
      setTimeout(() => resolve(undefined), WAIT_TIME)
     } catch (e) {
      reject(e)
     }
    },
    WAIT_TIME
   )
  })
 }
}