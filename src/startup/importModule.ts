import { ImportModuleResult } from './importModuleResult.js';

export async function importModule(path: string): Promise<ImportModuleResult> {
    return import(`file://${path}`)
        .then(module => new ImportModuleResult({path, module}))
        .catch(error => new ImportModuleResult({path, error}));
}
