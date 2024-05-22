
const Block = require('./modules/Block');


let MAX_COUNT = 4;


(async function () {

    await Block.retryFails(MAX_COUNT);
    
})();
