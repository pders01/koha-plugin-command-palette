import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
// import minifyHTML from "rollup-plugin-minify-html-literals";

export default {
  input: "./src/main.ts",
  output: {
    dir: "./Koha/Plugin/Xyz/Paulderscheid/CommandPalette/dist/",
    format: "umd",
    name: "CommandPaletteBundle",
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      declaration: false,
      declarationMap: false,
    }),
    //  minifyHTML(),
     terser(),
    //  analyze({
    //   summaryOnly: true,
    //  }),
  ],
};
