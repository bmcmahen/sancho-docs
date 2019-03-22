// https://github.com/pedronauck/docz/blob/351ff576c83f0feb48e578573ec335276a876cd6/core/docz-core/src/utils/docgen.ts
const reactDocgenTs = require("react-docgen-typescript");
const ts = require("typescript");
const fastglob = require("fast-glob");
const path = require("path");

function tsProgram(files) {
  return ts.createProgram(files, {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.Latest
  });
}

const tsDocgen = filepath =>
  new Promise((resolve, reject) => {
    try {
      const fullPath = path.resolve("./node_modules/sancho/src", filepath);
      const docs = reactDocgenTs
        .withDefaultConfig({
          propFilter: prop => {
            if (!prop.parent == null) {
              return true;
            }

            return (
              prop.parent.fileName.indexOf("node_modules/@types/react") < 0
            );
          }
        })
        .parse(fullPath);

      resolve(docs);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });

const tsParser = async filepath => {
  try {
    const data = await tsDocgen(filepath);
    return { [filepath]: data };
  } catch (err) {
    console.error(err);
    return null;
  }
};

const ROOT = path.resolve("node_modules/sancho/src");
const GLOB = "**/*.{ts,tsx}";

const docgen = async () => {
  const files = await fastglob(GLOB, { cwd: ROOT });
  const program = tsProgram(files);
  const docs = await Promise.all(
    files.map(async filepath => {
      return tsParser(filepath, program);
    })
  );

  const result = docs.reduce(
    (obj, doc) => (doc ? { ...obj, ...doc } : obj),
    {}
  );

  console.log(result);
};

docgen();
