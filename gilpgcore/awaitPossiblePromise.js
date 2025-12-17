/**
 * @template T
 * @param {T | Promise<T>} result
 */
export async function awaitPossiblePromise(result) {
 return result instanceof Promise ? await result : result
}