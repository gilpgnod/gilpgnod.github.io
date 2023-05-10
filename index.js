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
 return true
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
 const expansion = expande ? /* html */ `__declara();` : ""
 return (/* html */
  `<pre id="___pre"></pre>
<script>
 console.clear()
 const ___pre = document.getElementById("___pre")
 const ___lo = console.log
 ${expansion}
function __declara() {
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
}
/**
* @param {string} mensaje
* @returns {Promise<string>}
*/
async function question(mensaje) {
 return new Promise((resolve, reject) => {
  try {
   const respuesta = prompt(mensaje)
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
</script>
<script>__ejecuta();async function __ejecuta(){try {
debugger;
${src}










































































 } catch(e) {console.error(e)}
 // Programa terminado
}
</script>`)
}