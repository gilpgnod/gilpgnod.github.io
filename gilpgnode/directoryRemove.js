import { rm } from "fs/promises"

/**
 * @param {import("fs").PathLike} path
 */
export async function directoryRemove(path) {
 try {
  await rm(path, { force: true, recursive: true })
 } catch (e) {
  console.error(e)
 }
}