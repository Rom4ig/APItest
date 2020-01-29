const schemaGET = require('./schemas/schemaGETunknown.json');
const schemaPOST = require('./schemas/schemaPOSTuser.json');
const schemaPUT = require('./schemas/schemaPUTuser.json');
const schema = require('./schemas/schema.json');
const AJV = require('ajv');
const ajv = new AJV({
    schemas: [
        require('./schemas/definitions.json')
    ]
});
ajv.addSchema(schemaGET, './schemas/schemaGETunknown.json');
ajv.addSchema(schemaPOST, './schemas/schemaPOSTuser.json');
ajv.addSchema(schemaPUT, './schemas/schemaPUTuser.json');
ajv.addSchema(schema, './schemas/schema.json');

module.exports = function (schemaName, json) {
    let valid = ajv.validate(schemaName,json);
    if (!valid) console.log(ajv.errors);
    return valid;
};