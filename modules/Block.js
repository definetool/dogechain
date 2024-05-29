
const cheerio = require('cheerio');
const Cache = require('../lib/Cache');
const Page = require('../lib/Page');
const Details = require('./Block/Details');
const Transactions = require('./Block/Transactions');


let mapper = new Map();

class Block {

    constructor(no = 1) {
        let meta = {
            no,
            path: `block/${no}`,                //
            html: '',
            json: null,
        };

        mapper.set(this, meta);

    }

    async load(useCache) {
        let meta = mapper.get(this);
        let html = await Page.load(`${meta.path}`, useCache);

        meta.html = html;

        return html;
    }

  
    parse() { 
        let meta = mapper.get(this);
        let { html, } = meta;

        if (!html) {
            return;
        }

        let $ = cheerio.load(html);
        let details = Details.parse($);
        let transactions = Transactions.parse($);

        json = meta.json = { details, transactions, };

        return json;
    }

    write() {
        let meta = mapper.get(this);
        Cache.write(`${meta.path}.json`, meta.json);
    }

    exists() { 
        let meta = mapper.get(this);
        return Cache.exists(`${meta.path}.json`);
    }

   
}




module.exports = Block;
