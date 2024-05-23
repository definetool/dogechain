
const colors = require('colors');
const Cache = require('./lib/Cache');
const Address = require('./modules/Address');


let blocks = Cache.getBlocks();
let validCount = 0;
let all = [];


blocks.slice(0,10).forEach((no, index) => {
    let file = `block/${no}.json`;
    let { transactions, } = Cache.read(file, false);
    let list = Address.get({ transactions, });
    let { length, } = list;

    if (length > 0) {
        validCount++;
        all.push(...list);
    }

    console.log(`${index + 1}/${blocks.length}`.gray, `${file.cyan} ---> ${colors.yellow(length)} | ${colors.blue(all.length)}`);
});


let list = [...new Set(all)];

//这个比较耗时，而且可能会卡死。
// list = list.sort();

console.log(`───────────────────────────────────────────────`.bgGreen);
console.log(`├──总区块数 = ${colors.cyan(blocks.length)}`);
console.log(`├──有效区块数 = ${colors.cyan(validCount)}`);
console.log(`├──无效区块数 = ${colors.cyan(blocks.length - validCount)}`);
console.log(`├─────────────────────────────────────────────`);
console.log(`├──总地址数 = ${colors.cyan(all.length)}`);
console.log(`├──重复地址数 = ${colors.cyan(all.length - list.length)}`);
console.log(`└──合并后地址数 = ${colors.cyan(list.length)}`.bold);

Cache.write(`json/address/list.json`, list);

