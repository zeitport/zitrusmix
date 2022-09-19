
import { expect } from './sandbox.js';
import { html } from '../../src/html.js';
import { element } from '../../src/index.js';

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
            element('my-element', ({ html }) => html`<h1>Hello World!</h1>`);

            // When
            const result = html`<my-element></my-element>`;

            // Then
            expect(result.text).to.equal('<my-element><h1>Hello World!</h1></my-element>');
        });

        it('renders element with attributes', function () {
            // Given
            element('my-element', ({ html, attrs }) => html`<h1>Hello ${attrs.name}!</h1>`);

            // When
            const result = html`<my-element name="World"></my-element>`;

            // Then
            expect(result.text).to.equal('<my-element name="World"><h1>Hello World!</h1></my-element>');
        });

        it('renders nested custom elements', function () {
            // Given
            element('my-page', ({ html }) => html`<my-headline></my-headline>`);
            element('my-headline', ({ html }) => html`<h1>Hello World!</h1>`);

            // When
            const result = html`<my-page></my-page>`;

            // Then
            expect(result.text).to.equal('<my-page><my-headline><h1>Hello World!</h1></my-headline></my-page>');
        });
    });

    describe('custom element + slots', function () {
        it('renders custom element with a slot', function () {
            // Given
            element('my-element', ({ html }) => html`<h1>Hello!</h1><p><slot></slot></p>`);

            // When
            const result = html`<my-element>Some text</my-element>`;

            // Then
            expect(result.text).to.equal('<my-element><h1>Hello!</h1><p>Some text</p></my-element>');
        });

        it('renders multiple custom elements with a slot', function () {
            // Given
            element('my-header', ({ html }) => html`<h1><slot></slot></h1>`);
            element('my-body', ({ html }) => html`<section><slot></slot></section>`);

            // When
            const result = html`<my-header>Title</my-header><my-body>Content</my-body>`;

            // Then
            expect(result.text).to.equal('<my-header><h1>Title</h1></my-header><my-body><section>Content</section></my-body>');
        });

        it('renders multiple nested custom elements with a slot', function () {
            // Given
            element('my-page', ({ html }) => html`<my-header><slot></slot></my-header>`);
            element('my-header', ({ html }) => html`<h1><slot></slot></h1>`);

            // When
            const result = html`<my-page>Title</my-page>`;

            // Then
            expect(result.text).to.equal('<my-page><my-header><h1>Title</h1></my-header></my-page>');
        });

        it('renders custom element with named slots', function () {
            // Given
            element('my-page', ({ html }) => html`<header><slot name="title"></slot></header>`);

            // When
            const result = html`<my-page><h1 slot="title">Hello</h1><p>Some text</p></my-page>`;

            // Then
            expect(result.text).to.equal('<my-page><header><h1>Hello</h1></header></my-page>');
        });
    });
});
