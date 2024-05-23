

const Block = require('./modules/Block');


let begin = Number(process.argv[2] || '1');
let end = begin + Number(process.argv[3] || '100000');
let MAX_COUNT = 4;


(async function () {
    await Block.load({ begin, end, }, MAX_COUNT);
})();




