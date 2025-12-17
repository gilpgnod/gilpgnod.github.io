import { exec } from "node:child_process"
import { directoryRemove } from "./gilpgnode/directoryRemove.js"

directoryRemove("docs")
 .then(async () => {
  await directoryRemove("dist")
  await directoryRemove(".parcel-cache")
  const npx = exec('npx parcel build "./src/*.html" --dist-dir ./docs')
  if (npx.stdout) {
   npx.stdout.on('data', data => process.stdout.write(data))
  }
  if (npx.stderr) {
   npx.stderr.on('data', data => console.error(data))
  }
  npx.on('close', code => console.log(`child process exited with code ${code}`))
 })
 .catch(console.error)