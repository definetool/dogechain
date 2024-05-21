

require('colors');


const cheerio = require('cheerio');

const Cache = require('./Cache');
const Request = require('./Page/Request');


let root = `https://dogechain.info/`;



module.exports = {

    async load(path, cache) {
        let promise = new Promise((resolve, reject) => {
            if (cache) {
                let html = Cache.read(path);

                if (html) {
                    let $ = cheerio.load(html);
                    resolve({ $, html, });
                    return;
                }
            }

            let url = `${root}${path}`;

            Request.get(url, function (html) {
                if (!html) {
                    resolve();
                    return;
                }

                if (cache) {
                    Cache.write(path, html);
                }

                let $ = cheerio.load(html);
                resolve({ $, html, });
            });
           

        });
     

        return promise;
    },
};