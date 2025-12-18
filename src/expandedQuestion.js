const ___pre = document.getElementById("___pre")
const ___lo = console.log

/**
* @param {string} mensaje
* @returns {Promise<string>}
*/
async function question(mensaje) {
 return new Promise((resolve, reject) => {
  try {
   const respuesta = prompt(mensaje)
   ___lo.call(null, "%c" + mensaje + respuesta, "color:blue;font-style:oblique")
   if (___pre) {
    const div = ___pre.appendChild(document.createElement("div"))
    div.style.color = "blue"
    div.style.fontStyle = "oblique"
    div.textContent = mensaje + respuesta
   }
   queueMicrotask(() => resolve(respuesta || ""))
  } catch (e) {
   reject(e)
  }
 })
}
/**
 * @param {string} mensaje
 */
async function questionInt(mensaje) {
 return parseInt(await question(mensaje) || "", 10)
}
/**
 * @param {string} mensaje
 */
async function questionFloat(mensaje) {
 return parseFloat(await question(mensaje) || "")
}
async function clear() {
 return new Promise((resolve, reject) => {
  try {
   console.clear()
   queueMicrotask(() => resolve(undefined))
  } catch (e) {
   reject(e)
  }
 })
}
/**
 * @param {any[]} parametros
 */
async function log(...parametros) {
 return new Promise((resolve, reject) => {
  try {
   console.log(...parametros)
   queueMicrotask(() => resolve(undefined))
  } catch (e) {
   reject(e)
  }
 })
}
/** @param {any[]} parametros */
async function error(...parametros) {
 return new Promise((resolve, reject) => {
  try {
   console.log(...parametros)
   queueMicrotask(() => resolve(undefined))
  } catch (e) {
   reject(e)
  }
 })
}