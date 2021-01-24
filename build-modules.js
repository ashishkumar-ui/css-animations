const { readdirSync } = require('fs')
var fs = require("fs");

// get directory list utility function
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

// get directory list
const modules = getDirectories('app-modules');
const json = {};

modules.forEach(function(directory) {
    json[directory] = true;
});

console.log(JSON.stringify(json, null, 4));

var createStream = fs.writeFile("module-list.json", JSON.stringify(json, null, 4), () => {

});
