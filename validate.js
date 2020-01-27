const AJV = require('ajv');
const ajv = new AJV();
module.exports = function (schema, json) {
    let validate = ajv.compile(schema);
    let valid = validate(json);
    if (!valid) console.log(validate.errors);
    return valid;
};