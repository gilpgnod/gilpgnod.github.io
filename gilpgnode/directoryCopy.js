import { cp } from "fs/promises"

/**
 * @param {string} source
 * @param {string} target
 */
export function directoryCopy(source, target) {
 return cp(source, target, { recursive: true })
}