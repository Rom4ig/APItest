const AJV = require('ajv');
const ajv = new AJV({
    schemas: [
        require('./schemas/definitions.json')
    ]
});

module.exports = function (schemaName, json) {
    ajv.addSchema(require(schemaName), schemaName);
    let valid = ajv.validate(schemaName,json);
    if (!valid) console.log(ajv.errors);
    return valid;
};