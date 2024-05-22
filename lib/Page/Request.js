
const https = require('https');
const Timer = require('./Request/Timer');


const TIMEOUT = 5000;

module.exports = exports = {

    get(url, fn) { 
        let timer = new Timer();

        timer.start(`>>开始请求`.bgCyan, url.cyan);
        request();

        function request() { 
            let isTimeout = false;

            let tid = setTimeout(function () {
                isTimeout = true;
                timer.stop(`<<请求超时`.bgRed, url.red, `{time}`);
                req.destroy();
                fn();

            }, TIMEOUT);

            let req = https.get(url, function (res) {
                let html = '';

                res.on('data', function (chunk) {
                    html += chunk;
                });

                res.on('end', function () {
                    if (isTimeout) {
                        return;
                    }

                    clearTimeout(tid);
                    timer.stop(`<<结束请求`.bgGreen, url.green, `{time}`);
                    fn(html);
                });

            });

            req.on('error', function (error) {
                if (isTimeout) {
                    return;
                }

                clearTimeout(tid);
                timer.stop(`<<请求失败`.bgRed, url.magenta, `{time}`);
                fn();
                
            });
            
        }

       
    },
};