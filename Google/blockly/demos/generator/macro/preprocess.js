var Preprocessor = require(__dirname + "Preprocessor.js"),
    path = require("path"),
    fs = require("fs"),
    pkg = require(__dirname + "/../package.json");
if (process.argv.length < 3) {
    console.log("Preprocessor.js " + pkg.version + " - https://github.com/dcodeIO/Preprocessor.js\n");
    console.log("  Usage: " + path.basename(process.argv[1]) + " sourceFile [baseDirectory] [-myKey[=myValue], ...] [> outFile]");
    process.exit(11);
}
var sourceFile = process.argv[2];
var baseDir = ".",
    i = 3;
if (process.argv.length > i && process.argv[i].indexOf("=") < 0) {
    baseDir = process.argv[i];
    i++;
}
var directives = {};
for (; i < process.argv.length; i++) {
    if (process.argv[i].substring(0, 1) != '-') {
        console.log("Illegal directive: " + process.argv[i]);
        process.exit(12);
    }
    var d = process.argv[i].substring(1).split("=");
    if (d.length > 2) {
        console.log("Illegal directive: " + process.argv[i]);
        process.exit(12);
    }
    var val;
    if (d.length == 1 || d[1].toLowerCase() === "true") { val = true; } else if (d[1].toLowerCase() === "false") { val = false; } else if (d[1].toLowerCase() === "null") { val = null; } else { val = d[1]; }
    directives[d[0]] = val;
}
var source = fs.readFileSync(sourceFile) + "";
var pp = new Preprocessor(source, baseDir);
console.log(pp.process(directives));
process.exit(0);