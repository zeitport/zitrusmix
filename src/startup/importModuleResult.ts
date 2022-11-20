export class ImportModuleResult {
    readonly error: string | null = null;
    readonly module: Record<string, unknown> | null = null;
    readonly path: string | null = null;

    constructor(init: Partial<ImportModuleResult>) {
        this.path = init.path || null;
        this.module = init.module || null;
        this.error = init.error || null;
    }

    get exports(): string[] {
        return this.module ? Object.keys(this.module) : [];
    }
}
