const axios = require('./axios');
const expect = require('chai').expect;
const validate = require('./validate');
describe('test', () => {
    it('Get test', async () => {
        let res = await axios.get('api/unknown');
        console.log('GET');
        let valid = validate('./schemas/test/schemaGETunknown.json', res.data);
        expect(valid).to.be.true;
    });

    it('Post test', async () => {
        let data = {
            "name": "morph",
            "job": "leader"
        };
        let res = await axios.post('api/users', data);
        console.log('POST');
        console.log(res.data);
        let valid = validate('./schemas/schemaPOSTuser.json', res.data);
        expect(valid).to.be.true;
    });

    it('Put test', async () => {
        let data = {
            "name": "morpheus",
            "job": "zion resident"
        };
        let res = await axios.put('api/users/2', data);
        console.log('PUT');
        console.log(res.data);
        let valid = validate('./schemas/schemaPUTuser.json', res.data);
        expect(valid).to.be.true;
    });

    it('Delete test', async () => {
        let res = await axios.delete('api/users/2');
        console.log('DELETE');
        console.log(res.statusText);
        expect(res.status).to.equal(204);
    });

    it('Patch test', async () => {
        let data = {
            "name": "ivan",
            "job": "manager"
        };
        let res = await axios.patch('api/users/2', data);
        console.log('PATCH');
        console.log(res.data);
        let valid = validate('./schemas/schemaPUTuser.json', res.data);
        expect(valid).to.be.true;
    });

    it('Some json', async () => {
        let json = require('./some.json');
        let valid = validate('./schemas/schema.json', json);
        expect(valid).to.be.true;
    });
});


