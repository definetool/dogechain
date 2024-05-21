

const Block = require('./modules/Block');
const Fail = require('./modules/Fail');
const { console, } = require('./lib/Console');

let beginIndex = Number(process.argv[2] || '1');
let endIndex = beginIndex + Number(process.argv[3] || '100000');
let MAX_COUNT = 4;


(async function () {
    Fail.clear();

    for (let i = beginIndex; i < endIndex; i++){
        let block = null;
        let data = null;

        for (let k = 0; k < MAX_COUNT; k++) {
            if (k > 0) {
                console.log(`<----重试第 ${k} 次---->`.bgMagenta);
            }

            block = new Block(i);
            data = await block.load();

            if (data) {
                break;
            }
        }


        if (!data) {
            console.log(`----已超过重试次数，已放弃----`.bgRed);
            Fail.add(i);
            continue;
        }



        let { details, transactions, addresses, } = data;
        block.write({ details, addresses, transactions, });
    }

})();
