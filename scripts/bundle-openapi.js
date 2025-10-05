const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key] ?? {}, source[key]));
    }
  }
  return { ...target, ...source };
}

function loadYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

function main() {
  const root = path.resolve(__dirname, '..');
  const docsDir = path.join(root, 'docs', 'openapi');
  const rootSpecPath = path.join(docsDir, 'openapi.yaml');
  const outYamlPath = path.join(root, 'openapi.yaml');
  const outJsonPath = path.join(root, 'openapi.json');

  const base = loadYaml(rootSpecPath);

  // Merge all docs/openapi/paths/*.yml and docs/openapi/Module/**/**/*.yml
  let mergedPaths = {};

  function mergeDir(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        mergeDir(full);
      } else if (entry.endsWith('.yaml') || entry.endsWith('.yml')) {
        const spec = loadYaml(full);
        mergedPaths = deepMerge(mergedPaths, spec);
      }
    }
  }

  mergeDir(path.join(docsDir, 'paths'));
  mergeDir(path.join(docsDir, 'Module'));

  const finalDoc = {
    ...base,
    paths: mergedPaths,
  };

  const yamlString = yaml.dump(finalDoc, { indent: 2, lineWidth: 120, noRefs: true, sortKeys: false });
  fs.writeFileSync(outYamlPath, yamlString, 'utf8');
  fs.writeFileSync(outJsonPath, JSON.stringify(finalDoc, null, 2), 'utf8');
  console.log(`✅ Bundled OpenAPI written to ${outYamlPath} and ${outJsonPath}`);
}

main();


