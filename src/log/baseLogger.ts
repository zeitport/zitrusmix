export interface LogFn {
    (obj: {msg: string, level: string} & Record<string, unknown>): void;
}

export interface BaseLogger {
    debug: LogFn;
    info: LogFn;
    warn: LogFn;
    error: LogFn;
    fatal: LogFn;
}
