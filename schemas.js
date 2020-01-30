const fs = require('fs');
const AJV = require('ajv');
const ajv = new AJV();

function AJVInstance(path) {
    let arraySchemas = fs.readdirSync(path);
    arraySchemas.forEach((item) => {
        item = path + item;
        if (fs.statSync(item).isDirectory()) {
            item = item + '/';
            AJVInstance(item);
        } else {
            ajv.addSchema(require(item), item);
            console.log('added schema')
        }

    });
    return ajv;
}

module.exports = (dir) => AJVInstance(dir);