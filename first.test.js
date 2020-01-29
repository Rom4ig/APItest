const axios = require('./axios');
const expect = require('chai').expect;
const validate = require('./validate');
const schemaGET = require('./schemas/schemaGETunknown.json');
const schemaPOST = require('./schemas/schemaPOSTuser.json');
const schemaPUT = require('./schemas/schemaPUTuser.json');
const schemas = require('./schemas');

test('Get test', async () => {
    console.log(schemas);
    let res = await axios.get('api/unknown');
    console.log('GET');
    let valid = validate(schemaGET, res.data);
    expect(valid).to.be.true;
});

test('Post test', async () => {
    let data = {
        "name": "morph",
        "job": "leader"
    };
    let res = await axios.post('api/users', data);
    console.log('POST');
    console.log(res.data);
    let valid = validate(schemaPOST, res.data);
    expect(valid).to.be.true;
});

test('Put test', async () => {
    let data = {
        "name": "morpheus",
        "job": "zion resident"
    };
    let res = await axios.put('api/users/2', data);
    console.log('PUT');
    console.log(res.data);
    let valid = validate(schemaPUT, res.data);
    expect(valid).to.be.true;
});

test('Delete test', async () => {
    let res = await axios.delete('api/users/2');
    console.log('DELETE');
    console.log(res);
    expect(res.status).to.equal(204);
});

test('Patch test', async () => {
    let data = {
        "name": "ivan",
        "job": "manager"
    };
    let res = await axios.patch('api/users/2', data);
    console.log('PATCH');
    console.log(res.data);
    let valid = validate(schemaPUT, res.data);
    expect(valid).to.be.true;
});

test('Some json', async () => {
    let json = require('./some.json');
    //let schema = require('./schemas');
    let valid = validate('./schemas/schema.json', json);
    expect(valid).to.be.true;
});


