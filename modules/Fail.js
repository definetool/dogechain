

const File = require('@definejs/file');
const Cache = require('../lib/Cache');

let file = `./cache/fail/blocks.txt`;



module.exports = exports = {

    add(blockNo) { 
        File.append(file, `${blockNo},\n`);
    },

    //扫描并对比缓存中的区块编号，返回没有在缓存中的编号列表。
    verify() {
        let list = File.read(file);

        list = JSON.parse(`[${list} null]`);
        list = list.slice(0, -1);

        list = list.filter((no) => {
            let file = Cache.map(`block/${no}.json`);
            return !File.exists(file);
        });

        return list;
    },


    //清理掉已在缓存中的区块编号。
    clear() { 
        let list = exports.verify();
        let text = list.join(`,\n`) + `,`;

        File.write(file, text);
    },


};