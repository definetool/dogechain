
const Cache = require('./lib/Cache');
const Block = require('./modules/Block');


//重新解析缓存中所有的区块。
(async function () {
    let list = Cache.getBlocks();
    await Block.load(list);
})();


