const __cl = console.clear
const __lo = console.log
const __err = console.error
const __pre = document.getElementById("__pre")
window.onerror = (_evt, _src, lin, col, error) => {
 console.error((lin ? "Línea: " + (lin - 1) : ""), (col ? "columna: " + col : ""))
 console.error(error)
};
window.console.clear =
 /** @param {any[]} parametros */
 (...parametros) => {
  __cl.apply(null, parametros)
  if (__pre) {
   __pre.textContent = ""
  }
 }
window.console.log =
 /** @param {any[]} parametros */
 (...parametros) => {
  __lo.apply(null, parametros);
  const div = document.createElement("div")
  div.textContent = parametros.join(" ")
  if (__pre) {
   __pre.append(div);
  }
 };
window.console.error =
 /** @param {any[]} parametros */
 (...parametros) => {
  const div = document.createElement("div")
  div.style.color = "red"
  div.textContent = parametros.join(" ")
  if (__pre) {
   __pre.append(div)
  }
  __err.apply(null, parametros);
 }