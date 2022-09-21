import { expect } from './sandbox.js';
import { ast } from '../../src/utils/ast.js';

describe('getAttribute()', function () {
    it('returns evaluated expression', function () {
        // Given
        const node = {attrs: [{name: 'id', value: '42'}]};

        // When
        const id = ast.getAttribute(node, 'id');

        // Then
        expect(id).to.equal('42');
    });
});
