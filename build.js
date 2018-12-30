var fs = require('fs');
var path = require('path');
var filename = path.resolve(__dirname, 'base64.js');
var code = fs.readFileSync(filename).toString();

code += "\nmodule.exports = base64;\n";

fs.writeFileSync(path.resolve(__dirname, 'base64.node.js'), code);
