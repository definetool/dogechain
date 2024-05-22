
require('colors');

const path = require('path');
const $Array = require('@definejs/array');
const File = require('@definejs/file');
const { console, } = require('./Console');


module.exports = exports = {

    map(url) { 
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

        let dest = `./cache/${type}/${main}/${dirs.join('/')}/${base}${ext}`;

        return dest;
    },

    read(file) { 
        let dest = exports.map(file);

        if (!File.exists(dest)) {
            return null;
        }

        console.log(`读取缓存:`.gray, path.resolve(dest).gray);

        if (dest.endsWith('.json')) {
            return File.readJSON(dest);
        }

        return File.read(dest);

    },

    write(file, data) { 
        let ext = typeof data == 'string' ? '.html' : '.json';

        if (!file.endsWith(ext)) {
            file += ext;
        }


        let dest = exports.map(file);

        console.log(`写入缓存:`.grey, path.resolve(dest).gray);

        if (dest.endsWith('.json')) {
            File.writeJSON(dest, data);
        }
        else {
            File.write(dest, data);
        }
        
    },
};