const path = require("path");
const glob = require("glob");

module.exports = function (source) {
  // Getting the directory of the current file
  const workingDir = path.dirname(this.resourcePath);

  // Regular expression to match any glob imports in the source file
  const globImportRegex =
    /@import\s+["']([^"']+\*+\/?\*?\.?[^"']*\.scss)["'];/gm;

  // Finding all matches of the glob import regex in the source file
  const matches = [...source.matchAll(globImportRegex)];

  // If there are no matches, return the original source file
  if (!matches || matches.length === 0) {
    return source;
  }

  // Looping through each match and replacing it with the actual file imports
  for (const match of matches) {
    const stringToReplace = match[0];
    const globPattern = match[1];

    // Finding all files that match the glob pattern in the working directory
    const files = glob.sync(globPattern, {
      cwd: workingDir,
    });

    // If there are no files that match the glob pattern, comment out the glob import to prevent build errors
    if (!files || files.length === 0) {
      source = source.replace(stringToReplace, `// ${stringToReplace}`);
      continue;
    }

    // Creating an array of import statements for each file that matches the glob pattern
    const importStatements = files.map((file) => `@import "${file}";`);

    // Joining the import statements into a single string
    const importString = importStatements.join("\n");

    // Replacing the glob import with the actual file imports
    source = source.replace(stringToReplace, importString);
  }

  return source;
};
