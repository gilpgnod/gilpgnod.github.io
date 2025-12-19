class WebConsole {
 constructor(outputElement) {
  this.output = outputElement
  this.groupStack = [this.output]
  this.counters = {}
  this.timers = {}
 }

 get _currentContainer() {
  return this.groupStack[this.groupStack.length - 1]
 }

 // --- Motor de Renderizado ---
 _print(type, ...args) {
  const message = args.map(arg => {
   if (arg instanceof Error) return `${arg.name}: ${arg.message}\n${arg.stack}`
   if (typeof arg === 'object') return JSON.stringify(arg, null, 2)
   return String(arg)
  }).join(' ')

  const span = document.createElement('span')
  span.className = `log-${type}`
  span.textContent = `${message}\n`

  this._currentContainer.appendChild(span)
  this.output.scrollTop = this.output.scrollHeight
 }

 // --- Métodos de Salida Estándar ---
 log(...args) { this._print('log', ...args) }
 info(...args) { this._print('info', ...args) }
 warn(...args) { this._print('warn', ...args) }
 error(...args) { this._print('error', ...args) }
 debug(...args) { this._print('debug', ...args) }

 // --- Diagnóstico y Utilidades ---
 assert(condition, ...args) {
  if (!condition) {
   this._print('error', 'Assertion failed:', ...args)
  }
 }

 clear() {
  this.output.textContent = ''
  this.groupStack = [this.output]
  this.counters = {}
  this.timers = {}
 }

 dir(obj, options) {
  // En Node, dir muestra una lista interactiva. Aquí formateamos el objeto.
  this._print('log', '[Object Directory]:', obj)
 }

 dirxml(...args) {
  // En navegador suele ser igual a log/dir para elementos XML/DOM
  this.log(...args)
 }

 trace(...args) {
  const err = new Error()
  err.name = 'Trace'
  this._print('log', ...args, err.stack)
 }

 // --- Grupos ---
 group(...args) { this._createGroup(false, ...args) }
 groupCollapsed(...args) { this._createGroup(true, ...args) }

 _createGroup(collapsed, ...args) {
  const details = document.createElement('details')
  if (!collapsed) details.open = true
  const summary = document.createElement('summary')
  summary.className = 'console-group-title'
  summary.textContent = args.length > 0 ? args.join(' ') : 'Console Group'
  const content = document.createElement('div')
  content.className = 'console-group-content'
  details.append(summary, content)
  this._currentContainer.appendChild(details)
  this.groupStack.push(content)
 }

 groupEnd() {
  if (this.groupStack.length > 1) this.groupStack.pop()
 }

 // --- Contadores ---
 count(label = 'default') {
  this.counters[label] = (this.counters[label] || 0) + 1
  this._print('log', `${label}: ${this.counters[label]}`)
 }

 countReset(label = 'default') {
  if (this.counters[label]) {
   this.counters[label] = 0
  } else {
   this.warn(`Count for '${label}' does not exist`)
  }
 }

 // --- Temporizadores ---
 time(label = 'default') {
  this.timers[label] = performance.now()
 }

 timeLog(label = 'default', ...args) {
  if (this.timers[label]) {
   const delta = performance.now() - this.timers[label]
   this._print('log', `${label}: ${delta.toFixed(3)}ms`, ...args)
  }
 }

 timeEnd(label = 'default') {
  if (this.timers[label]) {
   this.timeLog(label)
   delete this.timers[label]
  }
 }

 // --- Tablas ---
 table(data, columns) {
  // Implementación simplificada para PRE
  this._print('log', '[Table View]')
  if (Array.isArray(data)) {
   this._print('log', JSON.stringify(data, columns, 2))
  } else {
   this.log(data)
  }
 }

 // --- Métodos de Perfilado (Stubs para compatibilidad) ---
 profile(label) { this.info(`Profile '${label}' started (Check browser devtools)`) }
 profileEnd(label) { this.info(`Profile '${label}' finished`) }
 timeStamp(label) { this.info(`Timestamp: ${label}`) }
}

class WebConsole {
 constructor(outputElement) {
  this.output = outputElement
  this.groupStack = [this.output]
  this.counts = {}
  this.timers = {}

  // Mapa de códigos ANSI a clases CSS
  this.ansiMap = {
   1: 'ansi-bold', 3: 'ansi-italic', 4: 'ansi-underline',
   30: 'ansi-black', 31: 'ansi-red', 32: 'ansi-green', 33: 'ansi-yellow',
   34: 'ansi-blue', 35: 'ansi-magenta', 36: 'ansi-cyan', 37: 'ansi-white',
   90: 'ansi-bright-black', 91: 'ansi-bright-red', 92: 'ansi-bright-green',
   93: 'ansi-bright-yellow', 94: 'ansi-bright-blue', 95: 'ansi-bright-magenta',
   96: 'ansi-bright-cyan', 97: 'ansi-bright-white'
  }
 }

 #parseANSI(text) {
  const fragment = document.createDocumentFragment()
  // Regex para capturar secuencias de escape ANSI: \x1b[ codes m
  const parts = text.split(/\x1b\[(\d+(?:;\d+)*)m/)

  let currentClasses = new Set()

  for (let i = 0; i < parts.length; i++) {
   if (i % 2 === 0) {
    // Es texto normal
    if (parts[i]) {
     const span = document.createElement('span')
     if (currentClasses.size > 0) {
      span.className = Array.from(currentClasses).join(' ')
     }
     span.textContent = parts[i]
     fragment.appendChild(span)
    }
   } else {
    // Es un código ANSI
    const codes = parts[i].split(';')
    codes.forEach(code => {
     const n = parseInt(code)
     if (n === 0) {
      currentClasses.clear() // Reset
     } else if (this.ansiMap[n]) {
      currentClasses.add(this.ansiMap[n])
     }
    })
   }
  }
  return fragment
 }

 _print(type, ...args) {
  const message = args.map(arg => {
   if (arg instanceof Error) return `${arg.name}: ${arg.message}\n${arg.stack}`
   if (typeof arg === 'object') return JSON.stringify(arg, null, 2)
   return String(arg)
  }).join(' ') + '\n'

  const lineContainer = document.createElement('div')
  lineContainer.className = `log-line log-${type}`

  // Procesar ANSI y añadir al contenedor
  lineContainer.appendChild(this.#parseANSI(message))

  this._currentContainer.appendChild(lineContainer)
  this.output.scrollTop = this.output.scrollHeight
 }

 // ... (Mantener todos los demás métodos: log, group, time, etc., de la respuesta anterior)
}

const myConsole = new WebConsole(document.getElementById('console-box'));

// Ejemplo manual: \x1b[31m es Rojo, \x1b[32m es Verde, \x1b[0m es Reset
myConsole.log("\x1b[31mEste texto es rojo\x1b[0m y este es normal.");
myConsole.info("\x1b[94m\x1b[1mINFO:\x1b[0m Operación completada en \x1b[32mcolor verde brillante\x1b[0m.");

// Ejemplo de advertencia con formato mixto
myConsole.warn("\x1b[33m\x1b[4mADVERTENCIA:\x1b[0m El proceso \x1b[1mPID: 402\x1b[0m está tardando demasiado.");

// Prueba de tabla dentro de un grupo con colores
myConsole.group("\x1b[35mReporte de Sistema\x1b[0m");
myConsole.log("Estado: \x1b[32mONLINE\x1b[0m");
myConsole.groupEnd();