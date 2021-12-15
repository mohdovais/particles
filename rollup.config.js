import swc from "./rollup-plugin-swc";
import resolver from "@rollup/plugin-node-resolve";

const resolve = resolver({ extensions: [".ts"] });

export default [
  {
    input: "src/main.ts",
    output: {
      file: "dist/particles.esm.js",
      format: "esm",
      name: "particles",
      sourcemap: true,
    },
    plugins: [resolve, swc({ minify: true, target: "es2021" })],
  },
  {
    input: "src/main.ts",
    output: {
      file: "dist/particles.umd.js",
      format: "umd",
      name: "particles",
      sourcemap: true,
    },
    plugins: [resolve, swc({ minify: true })],
  },
];
