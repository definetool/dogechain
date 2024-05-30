

const { console, } = require('./lib/Console');
const Fail = require('./modules/Fail');
const { start, } = require('./block');

//为 `html` 或 `json`。 
//如果为 `json`，则先请求对应区块的 html 页面，再对 html 进行解析以提取出数据写入 json 文件。 
//如果为 `html`，则只请求对应区块的 html 页面，不再解析成 json。
let type = 'html';
// let type = 'json'; 


(async function () {
    let list = Fail.clear(type);

    await start(list, type);

    let list2 = Fail.clear(type);

    console.log(`-----已成功重试 ${list.length - list2.length} 个区块-----`.bgGreen);

    if (list2.length == 0) {
        console.log(`-----已全部清空失败的区块-----`.bgGreen);
    }
    
})();
