import { assert, describe, it } from 'vitest';
import { css} from '../sandbox.js';

describe('css()', function () {
    describe('moduleId', function () {
        it('returns a module Id', function () {
            // When
            const result = css`.headliner { color: blue};`;

            // Then
            assert.notDeepEqual(result.moduleId, null);
            assert.notDeepEqual(result.moduleId, undefined);
        });
    });
});
