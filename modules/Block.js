

const Cache = require('../lib/Cache');
const Page = require('../lib/Page');
const Details = require('./Block/Details');
const Transactions = require('./Block/Transactions');



let mapper = new Map();

class Block {
    
    constructor(height = 1) { 
        let url = `block/${height}`;

        let meta = {
            height,
            url,                //
        };

        mapper.set(this, meta);
  
    }



    async load() { 
        let meta = mapper.get(this);
        let data = await Page.load(meta.url, true);

        if (!data) {
            return;
        }

        let { $, html, } = data;
        let details = Details.parse($);
        let { transactions, addresses, } = Transactions.parse($);
      
        return { html, details, transactions, addresses, };
    }

    write(data) { 
        let meta = mapper.get(this);
        Cache.write(`block/${meta.height}`, data);
    }


}




module.exports = Block;
