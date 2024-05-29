


const { console, } = require('./lib/Console');
const Block = require('./modules/Block');
const Fail = require('./modules/Fail');


module.exports = {

    async start(list) { 
        let isArray = Array.isArray(list);
        let len = isArray ? list.length : list.end - list.begin + 1;

        for (let i = 0; i < len; i++) {
            let no = isArray ? list[i] : list.begin + i;
            let block = new Block(no);

            if (block.exists()) {
                console.log(`已存在区块:`.gray, no);
                continue;
            }

            let html = '';

            for (let k = 0; k < 4; k++) {
                if (k > 0) {
                    console.log(`<----重试第 ${k} 次---->`.bgMagenta);
                }
                
                html = await block.load(true);

                //已成功，不需要再重试。
                if (html) {
                    break;
                }
            }

            if (html) {
                // block.parse();
                // block.write();
            }
            else {
                Fail.add(no);
                console.log(`----超过重试次数，已加入失败列表----`.bgRed);
            }
        }
    },

   
};







