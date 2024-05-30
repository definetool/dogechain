
const { start, } = require('./block');

let begin = Number(process.argv[2] || '1');
let end = begin + Number(process.argv[3] || '100000');

//为 `html` 或 `json`。 
//如果为 `json`，则先请求对应区块的 html 页面，再对 html 进行解析以提取出数据写入 json 文件。 
//如果为 `html`，则只请求对应区块的 html 页面，不再解析成 json。
let type = 'html';
// let type = 'json'; 




(async function () { 
    let list = { begin, end, };
    await start(list, type);
})();