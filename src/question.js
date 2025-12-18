/**
 * @param {string} mensaje
 */
async function question(mensaje) {
 const respuesta = prompt(mensaje)
 console.log(mensaje + respuesta)
 return respuesta || ""
}
/**
 * @param {string} mensaje
 */
async function questionInt(mensaje) {
 return parseInt(prompt(mensaje || "") || "", 10)
}
/**
 * @param {string} mensaje
 */
async function questionFloat(mensaje) {
 return parseFloat(prompt(mensaje || "") || "")
}
async function clear() {
   console.clear()
}
/**
 * @param {any[]} parametros
 */
async function log(...parametros) {
   console.log(...parametros)
}
/** @param {any[]} parametros */
async function error(...parametros) {
   console.log(...parametros)
}