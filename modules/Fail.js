

const File = require('@definejs/file');
const Cache = require('../lib/Cache');

let file = `./cache/fail/blocks.txt`;



module.exports = exports = {

    add(no) { 
        File.append(file, `${no},\n`);
    },

    //扫描并对比缓存中的区块编号，返回没有在缓存中的编号列表。
    verify() {
        let list = File.read(file);

        list = JSON.parse(`[${list} null]`);
        list = list.slice(0, -1);

        list = list.filter((no) => {
            return !Cache.exists(`block/${no}.html`);
        });

        list = [...new Set(list)].sort();

        return list;
    },


    //清理掉已在缓存中的区块编号。
    clear() { 
        let list = exports.verify();
        let text = ``;

        if (list.length > 0) {
            text = list.join(`,\n`);
            text += `,`;
        }

        File.write(file, text);

        return list;
    },


};