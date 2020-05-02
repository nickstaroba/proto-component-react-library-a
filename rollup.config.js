import image from "@rollup/plugin-image";
import ts from "@wessberg/rollup-plugin-ts";
import autoprefixer from "autoprefixer";
import fs from "fs";
import sass from "node-sass";
import path from "path";
import clean from "postcss-clean";
import rimraf from "rimraf";
import filesize from "rollup-plugin-filesize";
import ignoreImport from "rollup-plugin-ignore-import";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

import packageJson from "./package.json";

const distDirectory = path.join(__dirname, "dist");
const cjsBundleFilename = "dist/index.js";
const esmBundleFilename = "dist/index.esm.js";

function cleanDistDirectory() {
    if (fs.existsSync(distDirectory)) {
        rimraf.sync(`${distDirectory}/**/*`);
    } else {
        fs.mkdirSync(distDirectory);
    }
}

function createReadme() {
    fs.copyFileSync(
        path.join(__dirname, "README.md"),
        path.join(distDirectory, "README.md")
    );
}

function createPackageJson() {
    fs.writeFileSync(
        path.join(distDirectory, "package.json"),
        JSON.stringify(
            {
                name: packageJson.name,
                version: packageJson.version,
                description: packageJson.description,
                keywords: packageJson.keywords,
                homepage: packageJson.homepage,
                repository: packageJson.repository,
                license: packageJson.license,
                author: packageJson.author,
                main: path.basename(cjsBundleFilename),
                module: path.basename(esmBundleFilename),
                types: "index",
                dependencies: packageJson.dependencies,
                peerDependencies: packageJson.peerDependencies,
            },
            null,
            2
        )
    );
}

const plugins = [peerDepsExternal(), image(), terser(), filesize()];

const cjsConfig = {
    input: "src/index.ts",
    output: [
        {
            exports: "named",
            file: cjsBundleFilename,
            format: "cjs",
        },
    ],
    plugins: [
        ...plugins,
        ts({
            tsconfig: "tsconfig.cjs.json",
        }),
        postcss({
            extensions: [".scss", ".css"],
            extract: "styles.css",
            plugins: [autoprefixer, clean],
            preprocessor: (content, id) =>
                new Promise((resolve) => {
                    const result = sass.renderSync({ file: id });
                    resolve({ code: result.css.toString() });
                }),
        }),
    ],
};

const esmConfig = {
    input: "src/index.ts",
    output: [
        {
            exports: "named",
            file: esmBundleFilename,
            format: "es",
        },
    ],
    plugins: [
        ...plugins,
        ts({
            tsconfig: "tsconfig.esm.json",
        }),
        ignoreImport({
            extensions: [".scss", ".css"],
        }),
    ],
};

cleanDistDirectory();
createReadme();
createPackageJson();

export default [cjsConfig, esmConfig];
