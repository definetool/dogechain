
const { start, } = require('./block');

let begin = Number(process.argv[2] || '1');
let end = begin + Number(process.argv[3] || '100000');

(async function () { 
    let list = { begin, end, };
    await start(list);
})();