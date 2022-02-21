registraServiceWorker()

let editor = null
/** @type {HTMLInputElement|null} */
const abrir = document.querySelector("#abrir")
/** @type {HTMLAnchorElement|null} */
const guardar = document.querySelector("#guardar")
const ejecutar = document.querySelector("button")
/** @type {HTMLElement|null} */
const código = document.querySelector("#código")
/** @type {HTMLInputElement|null} */
const codigoMuestra = document.querySelector("#códigoMuestra")
const ventana = document.querySelector("iframe")
/** @type {HTMLElement|null} */
const ventanaSec = document.querySelector("#ventanaSec")
/** @type {HTMLInputElement|null} */
const ventanaMuestra = document.querySelector("#ventanaMuestra")

if (abrir) {
 abrir.addEventListener("change", archivoAbre)
}

if (ejecutar) {
 ejecutar.addEventListener("click", timeout)
}

if (codigoMuestra) {
 codigoActualiza()
 codigoMuestra.addEventListener("click", codigoActualiza)
}

if (ventanaMuestra) {
 ventanaSecActualiza()
 ventanaMuestra.addEventListener("click", ventanaSecActualiza)
}

if (código) {
 if (window.matchMedia) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
   // @ts-ignore
   editor = CodeMirror(código, {
    mode: "text/javascript",
    theme: "cobalt",
    extraKeys: { "Ctrl-Space": "autocomplete" },
    tabSize: 1,
    lineNumbers: true
   })
  } else {
   // @ts-ignore
   editor = CodeMirror(código, {
    mode: "text/javascript",
    extraKeys: { "Ctrl-Space": "autocomplete" },
    tabSize: 1,
    lineNumbers: true
   })
  }
 } else {
  // @ts-ignore
  editor = CodeMirror(código, {
   mode: "text/javascript",
   extraKeys: { "Ctrl-Space": "autocomplete" },
   tabSize: 1,
   lineNumbers: true
  })
 }
 const texto = decodeURIComponent(location.hash.replace(/^\#/, ""))
 editor.setValue(texto)
 guardarActualiza(texto)
 editor.on("change", contenidoCambia)
}

function codigoActualiza() {
 if (codigoMuestra && código) {
  código.style.display = codigoMuestra.checked ? '' : 'none'
 }
}

function ventanaSecActualiza() {
 if (ventanaMuestra && ventanaSec) {
  ventanaSec.style.display = ventanaMuestra.checked ? '' : 'none'
 }
}

function timeout() {
 setTimeout(ejecuta, 100)
}

function ejecuta() {
 if (ventana && código) {
  const src =
   codigoAdapta(editor.getValue(), !!ventanaMuestra && ventanaMuestra.checked)
  ventana.srcdoc = src
 }
}

function archivoAbre() {
 const selección = fileSeleccionado()
 if (selección) {
  const reader = new FileReader()
  reader.onload = () => {
   if (typeof reader.result === "string" && editor && guardar) {
    guardar.download = selección.name
    editor.setValue(reader.result)
    guardarActualiza(reader.result)
   }
  }
  reader.onerror = () => {
   if (reader.error) {
    errorMuestra(reader.error)
   }
  }
  reader.readAsText(selección)
 }
}

function fileSeleccionado() {
 return abrir && abrir.files && abrir.files[0]
}

function contenidoCambia() {
 const texto = editor.getValue()
 location.hash = encodeURIComponent(texto)
 guardarActualiza(texto);
}

/** @param {string} texto */
function guardarActualiza(texto) {
 if (guardar) {
  guardar.href =
   URL.createObjectURL(new Blob([texto], { type: "text/javscript" }))
 }
}

/** @param {DOMException} e */
function errorMuestra(e) {
 console.log(e)
 alert(e.message)
}

async function registraServiceWorker() {
 try {
  if (navigator.serviceWorker) {
   const registro = await navigator.serviceWorker.register("sw.js")
   console.log("Service Worker registrado.")
   console.log(registro)
  }
 } catch (e) {
  errorMuestra(e)
 }
}

/**
 * @param {string} src
 * @param {boolean} expande
 */
function codigoAdapta(src, expande) {
 return (/* html */ `<pre id="__pre"></pre><script>console.clear()</script>` +
  (expande ?
    /* html */ `<script>declara();debugger` :
   `<script>debugger`)
  + /* html */
  `
${src}








































function declara() {
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
}
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
 return parseInt(prompt(mensaje || "") || "", 10)
}
/**
 * @param {string} mensaje
 */
function questionFloat(mensaje) {
 return parseFloat(prompt(mensaje || "") || "")
}






































// Programa terminado
</script>`)
}