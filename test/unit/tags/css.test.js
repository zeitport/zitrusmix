import { expect, css, mixElements} from '../sandbox.js';

describe('css()', function () {
    describe('moduleId', function () {
        it('returns a module Id', function () {
            // When
            const result = css`.headliner { color: blue};`;

            // Then
            expect(result.moduleId).not.to.equal(null);
            expect(result.moduleId).not.to.equal(undefined);
        });
    });
});
