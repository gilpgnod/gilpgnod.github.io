class WebConsole {
 constructor(outputElement) {
  this.output = outputElement
 }

 // Método auxiliar para formatear y mostrar el texto
 _print(type, ...args) {
  const message = args.map(arg => {
   if (typeof arg === 'object') return JSON.stringify(arg, null, 2)
   return String(arg)
  }).join(' ')

  const span = document.createElement('span')
  span.className = `log-${type}`
  span.textContent = `[${type.toUpperCase()}] ${message}\n`

  this.output.appendChild(span)

  // Auto-scroll al final
  this.output.scrollTop = this.output.scrollHeight
 }

 log(...args) { this._print('log', ...args) }
 info(...args) { this._print('info', ...args) }
 warn(...args) { this._print('warn', ...args) }
 error(...args) { this._print('error', ...args) }
 debug(...args) { this._print('debug', ...args) }

 table(data) {
  this._print('log', 'Table View:')
  console.table(data) // Mantenemos la de sistema para debug real
  this._print('log', JSON.stringify(data, null, 2))
 }

 clear() {
  this.output.textContent = ''
 }

 // Implementación de contadores
 counts = {};
 count(label = 'default') {
  this.counts[label] = (this.counts[label] || 0) + 1
  this._print('log', `${label}: ${this.counts[label]}`)
 }

 countReset(label = 'default') {
  this.counts[label] = 0
  this._print('log', `Counter reset for: ${label}`)
 }

 // Implementación de temporizadores
 timers = {};
 time(label = 'default') {
  this.timers[label] = performance.now()
 }

 timeEnd(label = 'default') {
  const duration = performance.now() - this.timers[label]
  this._print('log', `${label}: ${duration.toFixed(3)}ms`)
  delete this.timers[label]
 }

 assert(condition, ...args) {
  if (!condition) {
   this._print('error', 'Assertion failed:', ...args)
  }
 }
}