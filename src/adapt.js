{
 const ____output = document.getElementById("____output")
 if (____output) {
  let groupStack = [____output]
  let counters = new Map()
  let timers = new Map()
  const clear = console.clear
  const log = console.log
  const info = console.info
  const warn = console.warn
  const error = console.error
  const debug = console.debug
  const assertcx = console.assert
  const count = console.count
  const countReset = console.countReset
  const time = console.time
  const timeLog = console.timeLog
  const timeEnd = console.timeEnd
  const group = console.group
  const groupCollapsed = console.groupCollapsed
  const groupEnd = console.groupEnd
  const table = console.table
  const dir = console.dir
  const dirxml = console.dirxml
  const trace = console.trace
  const profile = console.profile
  const profileEnd = console.profileEnd
  const timeStamp = console.timeStamp
  window.console.clear = function () {
   clear()
   if (____output) {
    ____output.textContent = ''
    groupStack = [____output]
    counters = new Map()
    timers = new Map()

   }
  }
  window.console.log = function (...args) {
   log(...args)
   print('log', args, 'log')
  }
  window.console.info = function (...args) {
   info(...args)
   print('info', args, 'info')
  }
  window.console.warn = function (...args) {
   warn(...args)
   print('warn', args, 'warn')
  }
  window.console.error = function (...args) {
   error(...args)
   print('error', args, 'error')
  }
  window.console.debug = function (...args) {
   debug(...args)
   print('debug', args, 'debug')
  }
  window.console.assert = function (condition, ...args) {
   assertcx(condition, ...args)
   if (!condition) print('log', ["Assertion failed: " + args.join(' ')], 'error')
  }
  window.console.count = function (label = 'default') {
   count(label)
   counters.set(label, (counters.get(label) || 0) + 1)
   print('log', [label + ": " + counters.get(label)], 'log')
  }
  window.console.countReset = function (label = 'default') {
   countReset(label)
   if (counters.get(label)) {
    counters.set(label, 0)
    print('log', [label + ": " + counters.get(label)], 'log')
   } else {
    print("warn", ["Count for " + label + " does not exist"], "warn")
   }
   counters.set(label, 0)
  }
  window.console.time = function (label = 'default') {
   time(label)
   timers[label] = performance.now()
  }
  window.console.timeLog = function (label = 'default', ...args) {
   timeLog(label)
   const timerValue = timers.get(label)
   if (timerValue) {
    const delta = performance.now() - timerValue.toFixed(3)
    print('log', [label + ": " + delta + "ms", ...args], "log")
   }
  }
  window.console.timeEnd = function (label = 'default') {
   timeEnd(label)
   const timerValue = timers.get(label)
   if (timerValue) {
    const delta = (performance.now() - timerValue).toFixed(3)
    print('log', [label + ": " + delta + "ms"], 'log')
    timers.delete(label)
   } else {
    print('warn', ["Timer '" + label + "' does not exist"], 'warn')
   }
  }
  window.console.group = function (label) {
   group(label)
   createGroup(false, label)
  }
  window.console.groupCollapsed = function (label) {
   groupCollapsed(label)
   createGroup(true, label)
  }
  window.console.groupEnd = function () {
   groupEnd()
   if (groupStack.length > 1) groupStack.pop()
  }
  window.console.table = function (data, columns) {
   table(data, columns)
   if (Array.isArray(data)) {
    print("--- Table View ---", 'info')
    print('log', data, 'log')
   } else {
    print('log', data, 'log')
   }
  }
  window.console.dir = function (obj, options) {
   dir(obj, options)
   // En Node, dir muestra una lista interactiva. Aquí formateamos el objeto.
   print('log', ['[Object Directory]:', obj], 'log')
  }
  window.console.dirxml = function (...args) {
   dirxml(...args)
   // En navegador suele ser igual a log/dir para elementos XML/DOM
   print('log', args, 'log')
  }
  window.console.trace = function (...args) {
   trace(...args)
   const err = new Error()
   err.name = 'Trace'
   print('log', [...args.map(arg => String(arg), err.stack)], 'log')
  }
  window.console.profile = function (label) {
   profile(label)
   print('info', ["Profile '" + label + "' started (Check browser devtools)"], 'info')
  }
  window.console.profileEnd = function (label) {
   profileEnd(label)
   print('info', ["Profile '" + label + "' finished"], 'info')
  }
  window.console.timeStamp = function (label) {
   timeStamp(label)
   print('info', ["Timestamp: " + label], 'info')
  }
  window.onerror = (message, _url, _line, _column, errorObject) => {
   error(errorObject)
   print('error', [message], 'error')
   return true
  }
  window.addEventListener('unhandledrejection', event => {
   const reason = event.reason
   if (reason) {
    error(reason)
    if (reason.message) {
     print('error', [reason.message], 'error')
    } else {
     print('error', [reason], 'error')
    }
   } else {
    error(event)
    print('error', [event], 'error')
   }
   event.preventDefault()
  })
  function getCurrentContainer() {
   return groupStack[groupStack.length - 1]
  }
  function print(method, args, type) {
   const message = args.map(arg => {
    if (arg instanceof Error) return arg.name + ": " + arg.message + " " + arg.stack
    if (typeof arg === 'object') return JSON.stringify(arg, null, 2)
    return String(arg)
   }).join(' ')
   const lineContainer = document.createElement('div')
   lineContainer.className = "log-line type-" + type
   lineContainer.textContent = message
   getCurrentContainer().appendChild(lineContainer)
   if (____output) {
    ____output.scrollTop = ____output.scrollHeight
   }
  }
  function createGroup(collapsed, ...args) {
   const details = document.createElement('details')
   if (!collapsed) details.open = true
   const summary = document.createElement('summary')
   summary.className = 'console-group-title'
   summary.textContent = args.length > 0 ? args.join(' ') : 'Console Group'
   const content = document.createElement('div')
   content.className = 'console-group-content'
   details.append(summary, content)
   getCurrentContainer().appendChild(details)
   groupStack.push(content)
  }
 }
}