const webConsole = new WebConsole(document.getElementById('console-box'));

// 1. Prueba de traza
webConsole.trace("Iniciando depuración");

// 2. Prueba de aserción
webConsole.assert(1 === 2, "El universo se ha roto, 1 no es igual a 2");

// 3. Prueba de temporizador con logs intermedios
webConsole.time("fetch-data");
setTimeout(() => {
    webConsole.timeLog("fetch-data", "Mitad de carga...");
    setTimeout(() => webConsole.timeEnd("fetch-data"), 500);
}, 500);

// 4. Limpieza automática
// webConsole.clear();

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