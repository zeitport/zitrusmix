import { expect } from './sandbox.js';
import { html } from '../../src/html.js';
import { zitrusmixElements } from '../../src/index.js';

describe('html()', function () {
    describe('expressions', function () {
        it('returns evaluated expression', function () {
            // Given
            const name = 'World';

            // When
            const result = html`<h1>Hello ${name}!</h1>`;

            // Then
            expect(result.text).to.equal('<h1>Hello World!</h1>');
        });
    });

    describe('custom element', function () {
        it('renders element', function () {
            // Given
            zitrusmixElements.defineRender('my-element', ({ html }) => html`<h1>Hello World!</h1>`);

            // When
            const result = html`<my-element></my-element>`;

            // Then
            expect(result.text).to.equal('<my-element><h1>Hello World!</h1></my-element>');
        });

        it('renders element inside <p>', function () {
            // Given
            zitrusmixElements.defineRender('my-element', ({ html }) => html`<ul>Hello World!</ul>`);

            // When
            const result = html`<p><my-element></my-element></p>`;

            // Then
            expect(result.text).to.equal('<p><my-element><ul>Hello World!</ul></my-element></p>');
        });

        it('renders element with attributes', function () {
            // Given
            zitrusmixElements.defineRender('my-element', ({ html, attrs }) => html`<h1>Hello ${attrs.name}!</h1>`);

            // When
            const result = html`<my-element name="World"></my-element>`;

            // Then
            expect(result.text).to.equal('<my-element name="World"><h1>Hello World!</h1></my-element>');
        });

        it('renders nested custom elements', function () {
            // Given
            zitrusmixElements.defineRender('my-page', ({ html }) => html`<my-headline></my-headline>`);
            zitrusmixElements.defineRender('my-headline', ({ html }) => html`<h1>Hello World!</h1>`);

            // When
            const result = html`<my-page></my-page>`;

            // Then
            expect(result.text).to.equal('<my-page><my-headline><h1>Hello World!</h1></my-headline></my-page>');
        });
    });

    describe('custom element + slots', function () {
        it('renders a slot', function () {
            // Given
            zitrusmixElements.defineRender('my-element', ({ html }) => html`<h1>Hello!</h1><p><slot></slot></p>`);

            // When
            const result = html`<my-element>Some text</my-element>`;

            // Then
            expect(result.text).to.equal('<my-element><h1>Hello!</h1><p>Some text</p></my-element>');
        });

        it('renders multiple slots', function () {
            // Given
            zitrusmixElements.defineRender('my-header', ({ html }) => html`<h1><slot></slot></h1>`);
            zitrusmixElements.defineRender('my-body', ({ html }) => html`<section><slot></slot></section>`);

            // When
            const result = html`<my-header>Title</my-header><my-body>Content</my-body>`;

            // Then
            expect(result.text).to.equal('<my-header><h1>Title</h1></my-header><my-body><section>Content</section></my-body>');
        });

        it('renders multiple nested slots', function () {
            // Given
            zitrusmixElements.defineRender('my-page', ({ html }) => html`<my-header><slot></slot></my-header>`);
            zitrusmixElements.defineRender('my-header', ({ html }) => html`<h1><slot></slot></h1>`);

            // When
            const result = html`<my-page>Title</my-page>`;

            // Then
            expect(result.text).to.equal('<my-page><my-header><h1>Title</h1></my-header></my-page>');
        });


        it('renders a named slot', function () {
            // Given
            zitrusmixElements.defineRender('my-page', ({ html }) => html`<header><slot name="title"></slot></header>`);

            // When
            const result = html`<my-page><h1 slot="title">Hello</h1><p>Some text</p></my-page>`;

            // Then
            expect(result.text).to.equal('<my-page><header><h1>Hello</h1></header></my-page>');
        });

        it('renders a named slot and a slot', function () {
            // Given
            zitrusmixElements.defineRender('my-page', ({ html }) => html`<header><slot name="title"></slot></header><slot></slot>`);

            // When
            const result = html`<my-page><h1 slot="title">Fruits</h1><p>Lemon</p><p>Apple</p></my-page>`;

            // Then
            expect(result.text).to.equal('<my-page><header><h1>Fruits</h1></header><p>Lemon</p><p>Apple</p></my-page>');
        });
    });
});
