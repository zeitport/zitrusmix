import { assert, describe, it, beforeEach } from 'vitest';
import {MixRenderEngine} from '../../../src/mixRenderEngine.js';
import {MixRenderContext} from '../../../src/tags/mixRenderContext.js';
import { css, html, MixElement, mixElements } from '../sandbox.js';
import {useCustomIdGenerator}   from '../../../src/utils/createId.js';
import {formatHtml} from '../../../src/utils/formatHtml.js';

const staticId = 'e54enyb6';
useCustomIdGenerator(() => staticId);

describe('MixRenderEngine()', function () {
    let engine: MixRenderEngine;

    beforeEach(function() {
        engine = new MixRenderEngine(new MixRenderContext());
    });

    describe('custom element', function () {
        it('renders element', async function () {
            // Given
            class MyElement extends MixElement {
                async render() {
                    return html`<h1>Hello World!</h1>`;
                }
            }
            mixElements.define('my-element', MyElement);

            // When
            const result = await engine.render(html`<my-element></my-element>`);

            // Then
            assert.deepEqual(result, '<my-element><h1>Hello World!</h1></my-element>');
        });

        it('renders element inside <p>', async function () {
            // Given
            class MyElement extends MixElement {
                async render() {
                    return html`<ul>Hello World!</ul>`;
                }
            }
            mixElements.define('my-element', MyElement);

            // When
            const result = await engine.render(html`<p><my-element></my-element></p>`);

            // Then
            assert.deepEqual(result, '<p><my-element><ul>Hello World!</ul></my-element></p>');
        });

        it('renders element with attributes', async function () {
            // Given
            class MyElement extends MixElement {
                name = this.attribute('name', 'World');

                async render() {
                    return html`<h1>Hello ${this.name}!</h1>`;
                }
            }
            mixElements.define('my-element', MyElement);

            // When
            const result = await engine.render(html`<my-element name="World"></my-element>`);

            // Then
            assert.deepEqual(result, '<my-element name="World"><h1>Hello World!</h1></my-element>');
        });

        it('renders child mix elements', async function () {
            // Given
            class MyPage extends MixElement {
                async render() {
                    return html`<my-headline></my-headline>`;
                }
            }

            class MyHeadline extends MixElement {
                async render() {
                    return html`<h1>Hello World!</h1>`;
                }
            }

            mixElements.define('my-page', MyPage);
            mixElements.define('my-headline', MyHeadline);

            // When
            const result = await engine.render(html`<my-page></my-page>`);

            // Then
            assert.deepEqual(result, '<my-page><my-headline><h1>Hello World!</h1></my-headline></my-page>');
        });
    });

    describe('slots', function () {
        it('renders a slot', async function () {
            // Given
            class MyElement extends MixElement {
                async render() {
                    return html`<h1>Hello!</h1><p><slot></slot></p>`;
                }
            }
            mixElements.define('my-element', MyElement);

            // When
            const result = await engine.render(html`<my-element>Some text</my-element>`);

            // Then
            assert.deepEqual(result, '<my-element><h1>Hello!</h1><p>Some text</p></my-element>');
        });

        it('renders multiple slots', async function () {
            // Given
            class MyHeader extends MixElement {
                async render() {
                    return html`<h1><slot></slot></h1>`;
                }
            }

            class MyCard extends MixElement {
                async render() {
                    return html`<section><slot></slot></section>`;
                }
            }

            mixElements.define('my-header', MyHeader);
            mixElements.define('my-card', MyCard);

            // When
            const result = await engine.render(html`<my-header>Title</my-header><my-card>Content</my-card>`);

            // Then
            assert.deepEqual(result, '<my-header><h1>Title</h1></my-header><my-card><section>Content</section></my-card>');
        });

        it('renders multiple nested slots', async function () {
            // Given
            class MyPage extends MixElement {
                async render() {
                    return html`<my-header><slot></slot></my-header>`;
                }
            }

            class MyHeader extends MixElement {
                async render() {
                    return html`<h1><slot></slot></h1>`;
                }
            }

            mixElements.define('my-page', MyPage);
            mixElements.define('my-header', MyHeader);

            // When
            const result = await engine.render(html`<my-page>Title</my-page>`);

            // Then
            assert.deepEqual(result, '<my-page><my-header><h1>Title</h1></my-header></my-page>');
        });

        it('renders a named slot', async function () {
            // Given
            class MyPage extends MixElement {
                async render() {
                    return html`<header><slot name="title"></slot></header>`;
                }
            }
            mixElements.define('my-page', MyPage);

            // When
            const result = await engine.render(html`<my-page><h1 slot="title">Hello</h1><p>Some text</p></my-page>`);

            // Then
            assert.deepEqual(result, '<my-page><header><h1>Hello</h1></header></my-page>');
        });

        it('renders a named slot and a slot', async function () {
            // Given
            class MyPage extends MixElement {
                async render() {
                    return html`<header><slot name="title"></slot></header><slot></slot>`;
                }
            }
            mixElements.define('my-page', MyPage);

            // When
            const result = await engine.render(html`<my-page><h1 slot="title">Fruits</h1><p>Lemon</p></my-page>`);

            // Then
            assert.deepEqual(result, '<my-page><header><h1>Fruits</h1></header><p>Lemon</p></my-page>');
        });

        it('renders nested elements with slots', async function () {
            // Given
            class MyPage extends MixElement {
                async render() {
                    return html`<section><slot></slot></section>`;
                }
            }

            class MyHeadline extends MixElement {
                async render() {
                    return html`<h1><slot></slot></h1>`;
                }
            }

            mixElements.define('my-page', MyPage);
            mixElements.define('my-headline', MyHeadline);

            // When
            const result = await engine.render(html`<my-page><my-headline>Hello World!</my-headline></my-page>`);

            // Then
            assert.deepEqual(result, '<my-page><section><my-headline><h1>Hello World!</h1></my-headline></section></my-page>');
        });
    });

    describe('scoped CSS class names', function () {
        it('uses scopes CSS class names', async function () {
            // Given
            class MyElement extends MixElement {
                static styles = css`.hero-title { color: blue;}`;
                async render() {
                    return html`<h1 class="hero-title">Hero</h1>`;
                }
            }
            mixElements.define('my-element', MyElement);

            // When
            const result = await engine.render(html`<my-element></my-element>`);

            // Then
            const expectedHtml = `<my-element><h1 class="hero-title-${MyElement.styles.moduleId}">Hero</h1></my-element>`;
            assert.deepEqual(result, expectedHtml);
        });


        it('uses scopes CSS class names for nested elements', async function () {
            // Given
            class MyPage extends MixElement {
                static styles = css`.page { width: 800px; }`;
                async render() {
                    return html`<div class="page"><slot></slot></div>`;
                }
            }

            class MyHeader extends MixElement {
                static styles = css`.header { color: blue;}`;
                async render() {
                    return html`<header class="header"><slot></slot></header>`;
                }
            }

            mixElements.define('my-page', MyPage);
            mixElements.define('my-header', MyHeader);

            // When
            const result = await engine.render(html`
                <my-page>
                    <my-header>
                        <h1>Hero</h1>
                    </my-header>
                </my-page>
            `);

            // Then
            const expectedHtml = `
                <my-page>
                    <div class="page-${MyPage.styles.moduleId}">
                        <my-header>
                            <header class="header-${MyHeader.styles.moduleId}">
                                <h1>Hero</h1>
                            </header>
                        </my-header>
                    </div>
                </my-page>
            `;
            assert.deepEqual(formatHtml(result), formatHtml(expectedHtml));
        });
    });
});
