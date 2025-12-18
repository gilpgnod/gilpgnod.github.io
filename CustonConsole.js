class CustomConsole {
 constructor(outputElement) {
  this.output = outputElement
  this.counters = {}
  this.timers = {}
  this.groupLevel = 0
 }

 // Método para capturar errores automáticos del navegador
 initGlobalCapture() {
  // 1. Capturar errores de ejecución (SyntaxError, ReferenceError, etc.)
  window.addEventListener('error', (event) => {
   const { message, filename, lineno, colno } = event
   this.error(`Uncaught Error: ${message}\nEn: ${filename}:${lineno}:${colno}`)
   // true evita que el error se muestre también en la consola real si se desea, 
   // pero normalmente es mejor dejarlo en false para tener ambos.
   return false
  })

  // 2. Capturar errores en Promesas (Async/Await sin catch)
  window.addEventListener('unhandledrejection', (event) => {
   this.error(`Uncaught (in promise): ${event.reason}`)
  })

  this.info("Captura de errores globales activada.")
 }

 #print(message, type = 'log') {
  const span = document.createElement('span')
  span.classList.add(`console-${type}`)
  const indent = "  ".repeat(this.groupLevel)

  let content
  if (message instanceof Error) {
   content = `${message.name}: ${message.message}\n${message.stack}`
  } else {
   content = typeof message === 'object'
    ? JSON.stringify(message, null, 2)
    : message
  }

  span.textContent = `${indent}[${type.toUpperCase()}] ${content}\n`
  this.output.appendChild(span)
  this.output.scrollTop = this.output.scrollHeight
 }

 // --- Métodos Básicos ---
 log(...args) { args.forEach(arg => this.#print(arg, 'log')) }
 error(...args) { args.forEach(arg => this.#print(arg, 'error')) }
 warn(...args) { args.forEach(arg => this.#print(arg, 'warn')) }
 info(...args) { args.forEach(arg => this.#print(arg, 'info')) }
 debug(...args) { args.forEach(arg => this.#print(arg, 'debug')) }

 // --- Aserciones ---
 assert(condition, ...args) {
  if (!condition) {
   this.#print(`Assertion failed: ${args.join(' ') || 'console.assert'}`, 'error')
  }
 }

 // --- Contadores ---
 count(label = 'default') {
  this.counters[label] = (this.counters[label] || 0) + 1
  this.#print(`${label}: ${this.counters[label]}`, 'log')
 }

 countReset(label = 'default') {
  this.counters[label] = 0
  this.#print(`${label} counter reset`, 'info')
 }

 // --- Temporizadores ---
 time(label = 'default') {
  this.timers[label] = performance.now()
 }

 timeEnd(label = 'default') {
  if (this.timers[label]) {
   const duration = performance.now() - this.timers[label]
   this.#print(`${label}: ${duration.toFixed(3)}ms`, 'log')
   delete this.timers[label]
  } else {
   this.#print(`Timer '${label}' does not exist`, 'warn')
  }
 }

 // --- Grupos (Visualmente representados por indentación) ---
 group(label = 'console.group') {
  this.#print(`▼ ${label}`, 'log')
  this.groupLevel++
 }

 groupCollapsed(label) {
  this.group(label) // En un <pre> simple, los manejamos igual
 }

 groupEnd() {
  if (this.groupLevel > 0) this.groupLevel--
 }

 // --- Tablas (Conversión simple a string con formato) ---
 table(data) {
  if (Array.isArray(data)) {
   this.#print("--- Table View ---", 'info')
   this.#print(data, 'log')
  } else {
   this.log(data)
  }
 }

 // --- Utilidades ---
 clear() {
  this.output.innerHTML = ''
  this.groupLevel = 0
 }
}