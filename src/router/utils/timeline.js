import { performance} from 'node:perf_hooks';

export class Timeline {
    constructor() {
        /**
         * @type {TimelineMark[]}
         */
        this.marks = [];
    }

    /**
     * @param {string} name
     */
    mark(name) {
        this.marks.push(new TimelineMark({name, time: performance.now()}));
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/PerformanceServerTiming
     * @returns {string}
     */
    getPerformanceServerTiming() {
        this.mark('getPerformanceServerTiming');

        const timings = [];

        for(let i = 0; i < this.marks.length - 1; i++) {
            const mark = this.marks[i];
            const nextMark = this.marks[i + 1];
            timings.push(`${mark.name};desc="${mark.name}";dur=${nextMark.time - mark.time}`);
        }

        return timings.join(', ');
    }
}

class TimelineMark {
    /**
     * @param {Required<TimelineMark>} init
     */
    constructor(init) {
        /**
         * @type {string}
         * @readonly
         */
        this.name = init.name;

        /**
         * @type {number}
         * @readonly
         */
        this.time = init.time;
    }
}
