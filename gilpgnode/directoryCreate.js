import { mkdir } from "fs/promises"

/**
 * @param {import("fs").PathLike} path
 */
export async function directoryCreate(path) {
 try {
  await mkdir(path)
 } catch (e) {
  console.error(e)
 }
}