/**
 * @param {string} mensaje
 */
function question(mensaje) {
 const respuesta = prompt(mensaje)
 console.log(mensaje + respuesta)
 return respuesta || ""
}
/**
 * @param {string} mensaje
 */
function questionInt(mensaje) {
 return parseInt(prompt(mensaje) || "", 10)
}
/**
 * @param {string} mensaje
 */
function questionFloat(mensaje) {
 return parseFloat(prompt(mensaje) || "")
}
console.clear()