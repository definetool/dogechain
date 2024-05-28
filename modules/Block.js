

const { console, } = require('../lib/Console');
const Cache = require('../lib/Cache');
const Page = require('../lib/Page');
const Details = require('./Block/Details');
const Transactions = require('./Block/Transactions');
const Fail = require('./Block/Fail');


let mapper = new Map();

class Block {

    constructor(no = 1) {
        let url = `block/${no}`;

        let meta = {
            no,
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
        let transactions = Transactions.parse($);

        return { html, details, transactions, };
    }

    write(data) {
        let meta = mapper.get(this);
        Cache.write(`block/${meta.no}`, data);
    }

    static async load(list, count = 1) {
        let isArray = Array.isArray(list);
        let len = isArray ? list.length : list.end - list.begin + 1;


        for (let i = 0; i < len; i++) {
            let block = null;
            let data = null;
            let no = isArray ? list[i] : i + list.begin;
            let file = `block/${no}.json`;

            if (Cache.exists(file)) {
                console.log(`已存在`.bgYellow, file.gray);
                continue;
            }

            for (let k = 0; k < count; k++) {
                if (k > 0) {
                    console.log(`<----重试第 ${k} 次---->`.bgMagenta);
                }

                block = new Block(no);
                data = await block.load();

                //成功，不需要再重试。
                if (data) {
                    break;
                }
            }

            if (data) {
                //data 里还有个 html 字段，内容较多，要去掉。
                let { details, transactions, } = data;
                block.write({ details, transactions, });
            }
            else {
                console.log(`----已超过重试次数，已放弃----`.bgRed);
                Fail.add(no);
            }
        }

    }

    static async retryFails(count) {
        let list = Fail.clear();

        await Block.load(list, count);

        let list2 = Fail.clear();

        console.log(`-----已成功重试 ${list.length - list2.length} 个区块-----`.bgGreen);

        if (list2.length == 0) {
            console.log(`-----已全部清空失败的区块-----`.bgGreen);
        }

    }

   
}




module.exports = Block;
