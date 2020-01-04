import { terser } from "rollup-plugin-terser";
import buble from "@rollup/plugin-buble";

export default [
  {
    input: "src/main.js",
    output: {
      file: "dist/particles.esm.js",
      format: "esm",
      name: "particles"
    },
    plugins: [terser()]
  },
  {
    input: "src/main.js",
    output: {
      file: "dist/particles.umd.js",
      format: "umd",
      name: "particles"
    },
    plugins: [buble(), terser()]
  }
];
