import { join, resolve } from "path";

const srcDir = resolve(__dirname);
const serverDir = resolve(join(srcDir, "/.."));
const assetsDir = resolve(join(serverDir, "/assets"));
const clientDir = resolve(join(serverDir, "/../client"));

export { serverDir, srcDir, assetsDir, clientDir };
