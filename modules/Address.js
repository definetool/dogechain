
const Cache = require('../lib/Cache');
const Page = require('../lib/Page');
const Details = require('./Address/Details');

let mapper = new Map();



class Address {

    constructor(address) {
        let url = `address/${address}`;

        let meta = {
            address,
            url,                //
        };

        mapper.set(this, meta);

    }

    async load() {
        let meta = mapper.get(this);
        let { $, html, } = await Page.load(meta.url, true);
        let details = Details.parse($);
        
        return { html, details, };

    }

    write(data) {
        let meta = mapper.get(this);
        Cache.write(`address/${meta.address}`, data);
    }


}


module.exports = Address;
