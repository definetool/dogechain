

const { console, } = require('./lib/Console');
const Fail = require('./modules/Fail');
const { start, } = require('./block');


(async function () {
    let list = Fail.clear();

    await start(list);

    let list2 = Fail.clear();

    console.log(`-----已成功重试 ${list.length - list2.length} 个区块-----`.bgGreen);

    if (list2.length == 0) {
        console.log(`-----已全部清空失败的区块-----`.bgGreen);
    }
    
})();
