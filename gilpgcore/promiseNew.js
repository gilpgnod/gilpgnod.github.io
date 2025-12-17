let _promiseNewFunction = promiseNewDefaultFunction

/**
 * @template T
 * @param {(executor: (resolve: (value: T) => void, reject: (reason?: any)
 *                          => void) => void) => Promise<T>} promiseNewFunction
 */
export function providePromiseNew(promiseNewFunction) {
 _promiseNewFunction = promiseNewFunction
}

/**
 * @template T
 * @param {(resolve: (value: T) => void, reject: (reason?: any) => void)
 *                                                            => void} executor
 * @returns {Promise<T>}
 */
export function promiseNew(executor) {
 return _promiseNewFunction(executor)
}

/**
 * @param {(resolve: (value: any) => void, reject: (reason?: any) => void)
 *                                                            => void} executor
 */
export function promiseNewDefaultFunction(executor) {
 return new Promise(executor)
}