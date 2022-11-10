import { assert, describe, it } from 'vitest';
import { css, html, MixElement, mixElements } from '../sandbox.js';

/**
 * A Mixin that creates a MixElement with a custom render function.
 * @param {function(import('../../../src/interfaces/elementContext.js').ElementContext): HtmlTemplateResult} customRender
 * @returns
 */
const MyElement = (customRender) => class extends MixElement {
    render(context) {
        return customRender(context);
    }
};

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
            const render = ({ html }) => html`<h1>Hello World!</h1>`;
            mixElements.define('my-element', MyElement(render));

            // When
            const result = html`<my-element></my-element>`;

            // Then
            assert.deepEqual(result.text, '<my-element><h1>Hello World!</h1></my-element>');
        });

        it('renders element inside <p>', function () {
            // Given
            const render = ({ html }) => html`<ul>Hello World!</ul>`;
            mixElements.define('my-element', MyElement(render));

            // When
            const result = html`<p><my-element></my-element></p>`;

            // Then
            assert.deepEqual(result.text, '<p><my-element><ul>Hello World!</ul></my-element></p>');
        });

        it('renders element with attributes', function () {
            // Given
            const render = ({ html, attrs }) => html`<h1>Hello ${attrs.name}!</h1>`;
            mixElements.define('my-element', MyElement(render));

            // When
            const result = html`<my-element name="World"></my-element>`;

            // Then
            assert.deepEqual(result.text, '<my-element name="World"><h1>Hello World!</h1></my-element>');
        });

        it('renders nested custom elements', function () {
            // Given
            const renderPage = ({ html }) => html`<my-headline></my-headline>`;
            mixElements.define('my-page', MyElement(renderPage));

            const renderHeadline = ({ html }) => html`<h1>Hello World!</h1>`;
            mixElements.define('my-headline', MyElement(renderHeadline));

            // When
            const result = html`<my-page></my-page>`;

            // Then
            assert.deepEqual(result.text, '<my-page><my-headline><h1>Hello World!</h1></my-headline></my-page>');
        });
    });

    describe('slots', function () {
        it('renders a slot', function () {
            // Given
            const render = ({ html }) => html`<h1>Hello!</h1><p><slot></slot></p>`;
            mixElements.define('my-element', MyElement(render));

            // When
            const result = html`<my-element>Some text</my-element>`;

            // Then
            assert.deepEqual(result.text, '<my-element><h1>Hello!</h1><p>Some text</p></my-element>');
        });

        it('renders multiple slots', function () {
            // Given
            const header = ({ html }) => html`<h1><slot></slot></h1>`;
            mixElements.define('my-header', MyElement(header));

            const body = ({ html }) => html`<section><slot></slot></section>`;
            mixElements.define('my-body', MyElement(body));

            // When
            const result = html`<my-header>Title</my-header><my-body>Content</my-body>`;

            // Then
            assert.deepEqual(result.text, '<my-header><h1>Title</h1></my-header><my-body><section>Content</section></my-body>');
        });

        it('renders multiple nested slots', function () {
            // Given
            const page = ({ html }) => html`<my-header><slot></slot></my-header>`;
            mixElements.define('my-page', MyElement(page));

            const header = ({ html }) => html`<h1><slot></slot></h1>`;
            mixElements.define('my-header', MyElement(header));

            // When
            const result = html`<my-page>Title</my-page>`;

            // Then
            assert.deepEqual(result.text, '<my-page><my-header><h1>Title</h1></my-header></my-page>');
        });

        it('renders a named slot', function () {
            // Given
            const page = ({ html }) => html`<header><slot name="title"></slot></header>`;
            mixElements.define('my-page', MyElement(page));

            // When
            const result = html`<my-page><h1 slot="title">Hello</h1><p>Some text</p></my-page>`;

            // Then
            assert.deepEqual(result.text, '<my-page><header><h1>Hello</h1></header></my-page>');
        });

        it('renders a named slot and a slot', function () {
            // Given
            const page = ({ html }) => html`<header><slot name="title"></slot></header><slot></slot>`;
            mixElements.define('my-page', MyElement(page));

            // When
            const result = html`<my-page><h1 slot="title">Fruits</h1><p>Lemon</p></my-page>`;

            // Then
            assert.deepEqual(result.text, '<my-page><header><h1>Fruits</h1></header><p>Lemon</p></my-page>');
        });
    });

    describe('scoped CSS class names', function () {
        it('uses scopes CSS class names', function () {
            // Given
            class MyElement extends MixElement {
                static styles = css`.hero-title { color: blue;}`;
                render({ html }) {
                    return html`<h1 class="hero title">Hero</h1>`;
                }
            }

            // The module Id is readonly, but we can override it for unit testing.
            // @ts-ignore
            MyElement.styles.moduleId = 'e54enyb6';

            mixElements.define('my-element', MyElement);

            // When
            const result = html`<my-element><h1 class="hero-title">Hero</h1></my-element>`;

            // Then
            assert.deepEqual(result.text, '<my-element><h1 class="hero-e54enyb6 title-e54enyb6">Hero</h1></my-element>');
        });


        it('uses scopes CSS class names for nested elements', function () {
            // Given
            class MyPage extends MixElement {
                static styles = css`.page { width: 800px; }`;
                render({ html }) {
                    return html`<div class="page"><slot></slot></div>`;
                }
            }

            class MyHeader extends MixElement {
                static styles = css`.header { color: blue;}`;
                render({ html }) {
                    return html`<header class="header"><slot></slot></header>`;
                }
            }

            // The module Id is readonly, but we can override it for unit testing.
            // @ts-ignore
            MyPage.styles.moduleId = 'page4200';
            // @ts-ignore
            MyHeader.styles.moduleId = 'head7300';

            mixElements.define('my-page', MyPage);
            mixElements.define('my-header', MyHeader);

            // When
            const result = html`<my-page><my-header><h1>Hero</h1></my-header></my-page>`;

            // Then
            assert.deepEqual(result.text, '<my-page><div class="page-page4200"><my-header><header class="header-head7300"><h1>Hero</h1></header></my-header></div></my-page>');
        });
    });
});
