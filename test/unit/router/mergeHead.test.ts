import { assert, describe, it } from 'vitest';
import * as parse5 from 'parse5';

import { mergeHead } from '../../../src/router/utils/mergeHead.js';

describe('mergeHead()', function () {
    it('merges meta tags', function () {
        // Given
        const document = parse5.parse('<html><head><title>Hello</title></head></html>');
        const fragment = parse5.parseFragment('<head><meta name="hello" content="world"></head>');

        // When
        mergeHead(document, fragment);

        // Then
        const actual = parse5.serialize(document);
        const expected = html`
            <html>
            <head>
                <meta name="hello" content="world">
                <title>Hello</title>
            </head>
            <body>
            </body>
            </html>
        `;
        assert.deepEqual(actual, expected);
    });

    it('merges only tags', function () {
        // Given
        const document = parse5.parse('<html><head><title>Hello</title></head></html>');
        const fragment = parse5.parseFragment('<head><!-- comment --><meta name="hello" content="world"></head>');

        // When
        mergeHead(document, fragment);

        // Then
        const actual = parse5.serialize(document);
        const expected = html`
            <html>
            <head>
                <meta name="hello" content="world">
                <title>Hello</title>
            </head>
            <body>
            </body>
            </html>
        `;
        assert.deepEqual(actual, expected);
    });

    it('use the document title tag', function() {
        // Given
        const document = parse5.parse('<html><head><title>Hello World!</title></head></html>');
        const fragment = parse5.parseFragment('<head><title>Hello</title></head>');

        // When
        mergeHead(document, fragment);

        // Then
        const actual = parse5.serialize(document);
        const expected = html`
            <html>
            <head>
                <title>Hello World!</title>
            </head>
            <body>
            </body>
            </html>
        `;
        assert.deepEqual(actual, expected);
    });

    it('use the document meta tag', function() {
        // Given
        const document = parse5.parse('<html><head><meta name="author" content="Doe"></head></html>');
        const fragment = parse5.parseFragment('<head><meta name="author" content="Company"></head>');

        // When
        mergeHead(document, fragment);

        // Then
        const actual = parse5.serialize(document);
        const expected = html`
            <html>
            <head>
                <meta name="author" content="Doe">
            </head>
            <body>
            </body>
            </html>
        `;
        assert.deepEqual(actual, expected);
    });
});

function html(strings, ...values) {
    const raw = String.raw({ raw: strings }, ...values);
    return raw
        .replaceAll(/>\s+</g, '><')
        .replaceAll('\n', '')
        .trim();
}
