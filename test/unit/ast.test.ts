import { assert, describe, it } from 'vitest';
import * as parse5 from 'parse5';

import { ast } from '../../src/utils/ast.js';

describe('utils/ast', function() {
    describe('getAttribute()', function() {
        it('returns evaluated expression', function() {
            // Given
            const node = { attrs: [{ name: 'id', value: '42' }] };

            // When
            const id = ast.getAttribute(node, 'id');

            // Then
            assert.equal(id, '42');
        });
    });

    describe('traverse', function() {
        it('returns selected nodes', function() {
            // Given
            const fragement = parse5.parseFragment(`
                <ul id="list">
                    <li><a href="/home"></a></li>
                    <li><a href="/about"></a></li>
                </ul>`
            );

            // When
            const selectTag = name => node => node.nodeName === name;
            const result = ast.traverse(fragement, selectTag('a'));

            // Then
            const actualLinks = [...result].map(node => node.attrs[0].value);
            const expectedLinks = ['/home', '/about'];
            assert.deepEqual(actualLinks, expectedLinks);
        });

        it('returns selected nodes excluding custom element childs', function() {
            // Given
            const fragement = parse5.parseFragment(`
                <a href="/">Logo</a>
                <my-nav>
                    <li><a href="/home"></a></li>
                    <li><a href="/about"></a></li>
                </my-nav>`
            );

            // When
            const selectTag = name => node => node.nodeName === name;
            const excludeCustomElement = node => !ast.isCustomElement(node);
            const result = ast.traverse(fragement, selectTag('a'), excludeCustomElement);

            // Then
            const actualLinks = [...result].map(node => node.attrs[0].value);
            const expectedLinks = ['/'];
            assert.deepEqual(actualLinks, expectedLinks);
        });
    });

    describe('traverseHighest()', function() {
        it('returns the highest custom element', function() {
            // Given
            const fragement = parse5.parseFragment(`
                <my-header>
                    <my-image></my-image>
                    <h1>Hello</h1>
                </my-header>
                <my-page>
                    <p>Some text here...</p>
                </my-page>
                `
            );

            // When
            const result = ast.traverseHighest(fragement, ast.isCustomElement);

            // Then
            const actualElements = [...result].map(node => node.tagName);
            const expectedElements = ['my-header', 'my-page'];
            assert.deepEqual(actualElements, expectedElements);
        });
    });
});
