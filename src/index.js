import {
 autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap
} from "@codemirror/autocomplete"
import {
 defaultKeymap, history, historyKeymap, indentWithTab
} from "@codemirror/commands"
import { html } from "@codemirror/lang-html"
import {
 bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput,
 indentUnit, syntaxHighlighting
} from "@codemirror/language"
import { lintKeymap } from "@codemirror/lint"
import {
 highlightSelectionMatches, searchKeymap
} from "@codemirror/search"
import { EditorState } from "@codemirror/state"
import {
 crosshairCursor,
 dropCursor,
 EditorView,
 highlightActiveLine,
 highlightActiveLineGutter,
 highlightSpecialChars,
 keymap,
 lineNumbers,
 rectangularSelection
} from "@codemirror/view"
import { gruvboxDark } from "cm6-theme-gruvbox-dark"
import { gruvboxLight } from "cm6-theme-gruvbox-light"
import { provideAlertDisplay } from "/gilpgcore/alertDisplay.js"
import { provideAsyncErrorProcessor } from "/gilpgcore/asyncErrorProcessor.js"
import { asyncTryCatch } from "/gilpgcore/asyncTryCatch.js"
import { provideErrorDisplay } from "/gilpgcore/errorDisplay.js"
import { provideErrorProcessor } from "/gilpgcore/errorProcessor.js"
import { tryCatch } from "/gilpgcore/tryCatch.js"
import {
 asyncErrorProcessorForBasicHtml
} from "/gilpghtml/asyncErrorProcessorForBasicHtml.js"
import {
 errorProcessorForBasicHtml
} from "/gilpghtml/errorProcessorForBasicHtml.js"
import { querySelector } from "/gilpghtml/querySelector.js"
import { readFileAsText } from "/gilpghtml/readFileAsText.js"
import { selectedFiles } from "/gilpghtml/selectedFiles.js"
import {
 serviceWorkerRegister
} from "/gilpghtml/serviceWorkerRegister.js"

tryCatch(
 () => {

  provideAlertDisplay(alert)
  provideErrorDisplay(alert)
  provideErrorProcessor(errorProcessorForBasicHtml)
  provideAsyncErrorProcessor(asyncErrorProcessorForBasicHtml)

  serviceWorkerRegister(
   navigator.serviceWorker.register(new URL('./sw.js', import.meta.url), { type: 'module', scope: '/' })
  )

  /**
   * @type {HTMLInputElement}
   */
  const openElement = querySelector(document, "#abrir")
  /**
   * @type {HTMLAnchorElement}
   */
  const saveElement = querySelector(document, "#guardar")
  const executeElement = querySelector(document, "#ejecutar")
  const codeElement = querySelector(document, "#code")
  /**
   * @type {HTMLInputElement}
   */
  const codeShowElement = querySelector(document, "#codeShow")
  /**
   * @type {HTMLIFrameElement}
   */
  const iframeElement = querySelector(document, "iframe")
  /**
   * @type {HTMLInputElement}
   */
  const windowShowElement = querySelector(document, "#windowShow")

  const darkModePreference = matchMedia('(prefers-color-scheme: dark)')
  darkModePreference.addEventListener("change", () => location.reload())

  let text = decodeURIComponent(location.hash.replace(/^\#/, ""))
  if (text.includes("&")) {
   const parts = text.split("&")
   codeShowElement.checked = parts[0] === "1"
   windowShowElement.checked = parts[1] === "1"
   text = parts[2] || ""
  }

  var editor = new EditorView({
   doc: text,
   parent: codeElement,
   extensions: [
    darkModePreference.matches ? gruvboxDark : gruvboxLight,
    // A line number gutter
    lineNumbers(),
    // A gutter with code folding markers
    foldGutter(),
    EditorState.tabSize.of(1),
    // Sets the string used for indentation to 2 spaces
    indentUnit.of(" "),

    // Replace non-printable characters with placeholders
    highlightSpecialChars(),
    // The undo history
    history(),
    // Show a drop cursor when dragging over the editor
    dropCursor(),
    // Allow multiple cursors/selections
    EditorState.allowMultipleSelections.of(true),
    // Re-indent lines when typing specific input
    indentOnInput(),
    // Highlight syntax with a default style
    syntaxHighlighting(defaultHighlightStyle),
    // Highlight matching brackets near cursor
    bracketMatching(),
    // Automatically close brackets
    closeBrackets(),
    // Load the autocompletion system
    autocompletion(),
    // Allow alt-drag to select rectangular regions
    rectangularSelection(),
    // Change the cursor to a crosshair when holding alt
    crosshairCursor(),
    // Style the current line specially
    highlightActiveLine(),
    // Style the gutter for current line specially
    highlightActiveLineGutter(),
    // Highlight text that matches the selected text
    highlightSelectionMatches(),
    keymap.of([
     indentWithTab,
     // Closed-brackets aware backspace
     ...closeBracketsKeymap,
     // A large set of basic bindings
     ...defaultKeymap,
     // Search-related keys
     ...searchKeymap,
     // Redo/undo keys
     ...historyKeymap,
     // Code folding bindings
     ...foldKeymap,
     // Autocompletion keys
     ...completionKeymap,
     // Keys related to the linter system
     ...lintKeymap
    ]),
    EditorView.updateListener.of(update => {
     tryCatch(() => {
      if (update.docChanged) {
       stateChanges()
      }
     },
      undefined)
    }),
    html(),
   ],
  })

  openElement.addEventListener("change", fileOpen)
  executeElement.addEventListener("click", ejecute)
  codeShowUpdate()
  codeShowElement.addEventListener("click", codeShowUpdate)
  windowShowUpdate()
  windowShowElement.addEventListener("click", windowShowUpdate)

  codeDisplay()
  windowDisplay()
  stateChanges()

  if (!codeShowElement.checked && windowShowElement.checked) {
   ejecute()
  }

  function fileOpen() {
   asyncTryCatch(
    async () => {
     const files = selectedFiles(openElement)
     if (files.length > 0) {
      const file = files[0]
      const text = await readFileAsText(file)
      saveElement.download = file.name
      setEditorContent(text)
      saveHrefUpdate(text)
     }
    },
    undefined
   )
  }

  function ejecute() {
   tryCatch(
    () => {
     const src =
      codeAdapt(editor.state.doc.toString(), windowShowElement.checked)
     iframeElement.srcdoc = src
    },
    undefined
   )
  }

  function codeShowUpdate() {
   tryCatch(
    () => {
     codeDisplay()
     stateChanges()
    },
    undefined
   )
  }

  function codeDisplay() {
   codeElement.hidden = !codeShowElement.checked
  }

  function windowShowUpdate() {
   tryCatch(
    () => {
     windowDisplay()
     stateChanges()
    },
    undefined
   )
  }

  function windowDisplay() {
   iframeElement.hidden = !windowShowElement.checked
  }

  /**
   * @param {string} newContent
   */
  function setEditorContent(newContent) {
   editor.dispatch({
    changes: {
     from: 0,
     to: editor.state.doc.length, // Reemplaza todo el contenido existente
     insert: newContent // Inserta el nuevo contenido
    }
   })
  }

  function stateChanges() {
   const text = encodeURIComponent(editor.state.doc.toString())
   const s = codeShowElement.checked ? "1" : "0"
   const w = windowShowElement.checked ? "1" : "0"
   location.hash = `${s}&${w}&&${text}`
   saveHrefUpdate(text)
  }

  /**
   * @param {string} text
   */
  function saveHrefUpdate(text) {
   saveElement.href =
    URL.createObjectURL(new Blob([text], { type: "text/html" }))
  }

  /**
   * @param {string} src
   * @param {boolean} expande
   */
  function codeAdapt(src, expande) {
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
 window.onerror = (event, _src, lin, col, error) => {
  console.error((lin ? "Línea: " + (lin - 113) : ""), (col ? "columna: " + col : ""))
  console.error(event)
  console.error(error)
 };
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

 },
 undefined
)