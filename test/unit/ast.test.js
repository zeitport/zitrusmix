import * as parse5 from 'parse5';

import { expect } from './sandbox.js';
import { ast } from '../../src/utils/ast.js';

describe('utils/ast', function() {
    describe('getAttribute()', function() {
        it('returns evaluated expression', function() {
            // Given
            const node = { attrs: [{ name: 'id', value: '42' }] };

            // When
            const id = ast.getAttribute(node, 'id');

            // Then
            expect(id).to.equal('42');
        });
    });

    describe('traverse', function() {
        it('returns selected nodes', function() {
            // Given
            const fragement = parse5.parseFragment(`
                <ul id="list">
                    <li><a href="/home"></a></li>
                    <li><a href="/abaout"></a></li>
                </ul>`
            );

            // When
            const selectTag = name => node => node.nodeName === name;
            const result = ast.traverse(fragement, selectTag('a'));

            // Then
            const actualLinks = [...result].map(node => node.attrs[0].value);
            const expectedLinks = ['/home', '/abaout'];
            expect(actualLinks).to.deep.equal(expectedLinks);
        });

        it('returns selected nodes excluding custom element childs', function() {
            // Given
            const fragement = parse5.parseFragment(`
                <a href="/">Logo</a>
                <my-nav>
                    <li><a href="/home"></a></li>
                    <li><a href="/abaout"></a></li>
                </my-nav>`
            );

            // When
            const selectTag = name => node => node.nodeName === name;
            const excludeCustomElement = node => !ast.isCustomElement(node);
            const result = ast.traverse(fragement, selectTag('a'), excludeCustomElement);

            // Then
            const actualLinks = [...result].map(node => node.attrs[0].value);
            const expectedLinks = ['/'];
            expect(actualLinks).to.deep.equal(expectedLinks);
        });
    });
});
