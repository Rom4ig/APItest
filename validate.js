const AJV = require('ajv');
const ajv = new AJV({
    schemas: [
        require('./schemas/definitions'),
        require('./schemas/schema')
    ]
});
module.exports = function (schema, json) {
    let validate = ajv.compile(schema);
    let valid = validate(json);
    if (!valid) console.log(validate.errors);
    return valid;
};