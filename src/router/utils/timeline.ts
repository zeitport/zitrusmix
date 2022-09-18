import { performance} from 'node:perf_hooks';

export class Timeline {
    readonly marks: TimelineMark[] = [];

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

        const timings: string[] = [];

        for(let i = 0; i < this.marks.length - 1; i++) {
            const mark = this.marks[i];
            const nextMark = this.marks[i + 1];
            timings.push(`${i}-${mark.name};desc="${mark.name}";dur=${nextMark.time - mark.time}`);
        }

        return timings.join(', ');
    }
}

class TimelineMark {
    readonly name: string;
    readonly time: number;

    constructor(init: Required<TimelineMark>) {
        this.name = init.name;
        this.time = init.time;
    }
}
