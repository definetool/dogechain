
const colors = require('colors');

const File = require('@definejs/file');
const Directory = require('@definejs/directory');


let dir = `./cache/json/block/`;
let files = Directory.getFiles(dir);


let validCount = 0;
let all = [];


files.forEach((file, index) => {
    let { addresses, } = File.readJSON(file);
    let { length, } = addresses;

    console.log(`${index+1}/${files.length}`.gray, file.cyan, `--->`, length);

    if (length > 0) {
        validCount++;
        all.push(...addresses);
    }
});


let list = [...new Set(all)].sort();

console.log(`----------------------------------------`.bgGreen);

console.log(`├──总区块数 = ${colors.cyan(files.length)}`);
console.log(`├──有效区块数 = ${colors.cyan(validCount)}`);
console.log(`├──无效区块数 = ${colors.cyan(files.length - validCount)}`);
console.log(`├──`);
console.log(`├──总地址数 = ${colors.cyan(all.length)}`);
console.log(`├──重复地址数 = ${colors.cyan(all.length - list.length)}`);
console.log(`└──合并后地址数 = ${colors.cyan(list.length)}`.bold);

File.writeJSON(`./cache/json/address/list.json`, list);

