

require('colors');


const Cache = require('./Cache');
const Request = require('./Page/Request');


let root = `https://dogechain.info/`;



module.exports = {

    async load(path, useCache) {
        let promise = new Promise((resolve, reject) => {
            if (useCache) {
                let html = Cache.read(path, true);
                if (html) {
                    resolve(html);
                    return;
                }
            }

            let url = `${root}${path}`;

            Request.get(url, function (html) {
                if (!html) {
                    resolve();
                    return;
                }

                if (useCache) {
                    Cache.write(path, html);
                }

                resolve(html);
            });
           

        });
     

        return promise;
    },
};