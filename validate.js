const ajv = require('./schemas');
module.exports = function (schemaName, json) {
    let valid = ajv.validate(schemaName,json);
    if (!valid) console.log(ajv.errors);
    return valid;
};