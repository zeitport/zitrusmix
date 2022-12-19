import { assert, describe, it } from 'vitest';
import { html } from '../sandbox.js';
import {useCustomIdGenerator}   from '../../../src/utils/createId.js';

const staticId = 'e54enyb6';
useCustomIdGenerator(() => staticId);

describe('html()', function () {
    describe('expressions', function () {
        it('returns evaluated expression', function () {
            // Given
            const name = 'World';

            // When
            const result = html`<h1>Hello ${name}!</h1>`;

            // Then
            assert.deepEqual(result.raw, '<h1>Hello World!</h1>');
        });
    });
});
