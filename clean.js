import { directoryRemove } from "./gilpgnode/directoryRemove.js"

directoryRemove("docs")
 .then(() => directoryRemove("dist"))
 .then(() => directoryRemove(".parcel-cache"))
 .catch(error => console.log(error))