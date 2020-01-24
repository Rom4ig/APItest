const axios = require('./axios');
const expect = require('chai').expect;

test('Some test', async ()=>{
    const res = await axios.get('api/users');
    console.log(res);
    expect(res.data.data[0].email).to.eql('george.bluth@reqres.in');});

