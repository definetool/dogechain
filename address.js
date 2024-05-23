
const colors = require('colors');
const Cache = require('./lib/Cache');
const Address = require('./modules/Address');


let blocks = Cache.getBlocks();
let validCount = 0;
let all = [];

let total = 0;
let groups = [];
let group = null;

// //for fast test
// blocks = blocks.slice(0, 10);

let t0 = new Date();

blocks.forEach((no, index) => {
    if (index % 1000 == 0) {
        group = [];
        groups.push(group);
        console.log('创建分组', groups.length);
    }


    let file = `block/${no}.json`;
    let { transactions, } = Cache.read(file, false);
    let list = Address.get({ transactions, });

    if (list.length > 0) {
        validCount++;
        total += list.length;
        group.push(...list);
    }

    console.log(`${index + 1}/${blocks.length}`.gray, `${file.cyan} ---> ${colors.yellow(list.length)} | ${colors.blue(total)}`);
});


let t1 = new Date();
let tt = t1 - t0;
console.log(tt/1000);

console.log(`───────────────────────────────────────────────`.bgGreen);

Cache.write(`json/address/list.json`, groups);
return;

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

