
const $Timer = require('@definejs/timer');
const $Date = require('@definejs/date');
const $String = require('@definejs/string');

const { console, } = require('../../Console');

let mapper = new Map();

class Timer {
    constructor() { 
        let timer = new $Timer();
        let meta = {
            timer,
        };

        mapper.set(this, meta);
    }

    start(...msgs) { 
        let meta = mapper.get(this);
        meta.timer.start();
        console.log(...msgs);
    }

    stop(...msgs) {
        let meta = mapper.get(this);
        let data = meta.timer.stop();
        let { desc, } = $Date.size(data.value);
        let time = `${desc.ww}${desc.dd}${desc.hh}${desc.mm}${desc.ss}${desc.ms}`;

        msgs = msgs.map((msg) => {
            return $String.format(msg, { time, });
        });

        console.log(...msgs);
    }

}

module.exports = Timer;