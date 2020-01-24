const AJV = require('ajv');
const ajv = new AJV();
module.exports = function (schema, res) {
    let validate = ajv.compile(schema);
    let valid = validate(res.data);
    if (!valid) console.log(validate.errors);
    return valid;
};