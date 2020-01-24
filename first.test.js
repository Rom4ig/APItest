const axios = require('./axios');
const expect = require('chai').expect;
const validate = require('./validate');
const schema = require('./schema');

test('Some test', async () => {
    const res = await axios.get('api/unknown');
    let valid = validate(schema, res);
    expect(valid).to.be.true;
});

