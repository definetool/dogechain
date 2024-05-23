
require('colors');

const path = require('path');
const $Array = require('@definejs/array');
const File = require('@definejs/file');
const Directory = require('@definejs/directory');
const { console, } = require('./Console');

const ROOT = `./cache/`;

module.exports = exports = {

    map(url) { 
        let isUrl = url.startsWith('block/')
            || url.startsWith('address/')
            || url.startsWith('tx/');


        //不是指定格式的 url，则直接原样返回。
        if (!isUrl) {
            return `${ROOT}${url}`;
        }
     

        //`block/`
        //`address/`
        //`tx/`
        url = url.split('?')[0]; //去掉查询字符串。

        let a = url.split('/');
        let main = a[0];
        let name = a[1];

        let ext = path.extname(name) || '.html';
        let base = path.basename(name, ext);
        let type = ext.slice(1); 

        //`block/5147849.html` --> `block/5/14/78/5147849.html`;
        let groups = $Array.group(base.split('').reverse(), 2);
        
        groups = groups.reverse();


        let dirs = groups.slice(0, -1).map((list) => {
            return list.reverse().join('').toUpperCase();
        });

        let dest = `${ROOT}${type}/${main}/${dirs.join('/')}/${base}${ext}`;

        return dest;
    },

    read(file, log) { 
        let dest = exports.map(file);

        if (!File.exists(dest)) {
            return null;
        }

        if (log) {
            console.log(`读取:`.gray, path.resolve(dest).gray);
        }

        if (dest.endsWith('.json')) {
            return File.readJSON(dest);
        }

        return File.read(dest);

    },

    write(file, data) { 
        let ext = path.extname(file);

        //如果不指定后缀名，则根据数据类型进行判断。
        if (!ext) {
            ext = typeof data == 'object' ? '.json' : '.html';
            file += ext;
        }



        let dest = exports.map(file);

        console.log(`写入:`.grey, path.resolve(dest).gray);

        if (typeof data == 'object') {
            File.writeJSON(dest, data);
        }
        else {
            File.write(dest, data);
        }
        
    },

    getFiles(dir) {
        let files = Directory.getFiles(`${ROOT}${dir}`);
        return files;
    },

    getBlocks() { 
        let list = [];
        let files = exports.getFiles(`json/block`);

        //里面可能会有一些系统自动产生的文件，这里要进行过滤。
        files.forEach((file) => {
            let ext = path.extname(file);

            if (ext != '.json') {
                return;
            }

            let name = path.basename(file, ext);
            let no = Number(name);

            if (isNaN(no)) {
                return;
            }

            list.push(no);
        });

        return list;
    }
};