{
 const ___pre = document.getElementById("___pre")
 const ___lo = console.log
 const ___cl = console.clear
 const ___err = console.error
 window.onerror = (_evt, _src, lin, col, error) => {
  console.error((lin ? "Línea: " + (lin - 113) : ""), (col ? "columna: " + col : ""))
  console.error(error)
 }
 window.addEventListener('unhandledrejection', event => {
  console.error(event)
 })
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
   ___lo.apply(null, parametros)
   if (___pre) {
    const div = ___pre.appendChild(document.createElement("div"))
    div.textContent = parametros.join(" ")
   }
  }
 window.console.error =
  /** @param {any[]} parametros */
  (...parametros) => {
   ___err.apply(null, parametros)
   if (___pre) {
    const div = ___pre.appendChild(document.createElement("div"))
    div.style.color = "red"
    div.textContent = parametros.join(" ")
   }
  }
}