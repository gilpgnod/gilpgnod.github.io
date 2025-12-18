class WebConsole {
 constructor(outputElement) {
  this.output = outputElement
  this.groupStack = [this.output]
  this.counts = {}
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
  this.counts = {}
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
  this.counts[label] = (this.counts[label] || 0) + 1
  this._print('log', `${label}: ${this.counts[label]}`)
 }

 countReset(label = 'default') {
  if (this.counts[label]) {
   this.counts[label] = 0
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