const ___pre = document.getElementById("___pre")
const ___lo = console.log
const ___cl = console.clear
const ___err = console.error
window.onerror = (_evt, _src, lin, col, error) => {
 console.error((lin ? "Línea: " + (lin - 113) : ""), (col ? "columna: " + col : ""))
 console.error(error)
};
window.console.clear =
 /** @param {any[]} parametros */
 (...parametros) => {
  ___cl.apply(null, parametros)
  if (___pre) {
   ___pre.textContent = ""
  }
 }
window.console.log =
 /** @param {any[]} parametros */
 (...parametros) => {
  ___lo.apply(null, parametros);
  if (___pre) {
   const div = ___pre.appendChild(document.createElement("div"))
   div.textContent = parametros.join(" ")
  }
 };
window.console.error =
 /** @param {any[]} parametros */
 (...parametros) => {
  ___err.apply(null, parametros);
  if (___pre) {
   const div = ___pre.appendChild(document.createElement("div"))
   div.style.color = "red"
   div.textContent = parametros.join(" ")
  }
 }
/**
* @param {string} mensaje
* @returns {Promise<string>}
*/
async function question(mensaje) {
 const respuesta = prompt(mensaje)
 return new Promise((resolve, reject) => {
  try {
   ___lo.call(null, "%c" + mensaje + respuesta, "color:blue;font-style:oblique");
   if (___pre) {
    const div = ___pre.appendChild(document.createElement("div"))
    div.style.color = "blue"
    div.style.fontStyle = "oblique"
    div.textContent = mensaje + respuesta
   }
   setTimeout(() => resolve(respuesta || ""), 60)
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
   setTimeout(() => resolve(undefined), 60)
  } catch (e) {
   reject(e)
  }
 })
}
/** @param {any[]} parametros */
async function log(...parametros) {
 return new Promise((resolve, reject) => {
  try {
   console.log(...parametros);
   setTimeout(() => resolve(undefined), 60)
  } catch (e) {
   reject(e)
  }
 })
}
/** @param {any[]} parametros */
async function error(...parametros) {
 return new Promise((resolve, reject) => {
  try {
   console.log(...parametros);
   setTimeout(() => resolve(undefined), 60)
  } catch (e) {
   reject(e)
  }
 })
}