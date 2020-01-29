const fs = require('fs');
const AJV = require('ajv');
const ajv = new AJV();
function readDir(path) {
    let array = [];
    let arraySchemas = fs.readdirSync(path);
    arraySchemas.forEach((item) => array.push(path + item));
    return array;
}

let arraySchemas = readDir('./schemas/');
arraySchemas.forEach((item) => ajv.addSchema(require(item),item));
module.exports = ajv;