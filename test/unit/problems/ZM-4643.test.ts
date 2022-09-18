import { expect, describe, it, vi } from 'vitest';
import { MixElement } from '../../../src/mixElement.js';
import { mixElements } from '../../../src/mixElements.js';
import { html } from '../../../src/tags/html.js';
import { log } from '../../../src/log.js';

vi.mock('../../../src/log.js', () => {
    return {
        log: {
            warn: vi.fn()
        }
    };
});

describe('problem', function () {
    describe('ZM-4643: Attribute is not declared on element', function () {
        it('logs a warning message', function () {
            // Given
            class MyElement extends MixElement {
                async render() {
                    return html`<h1>Hello World!</h1>`;
                }
            }
            mixElements.define('my-element', MyElement);

            // When
            html`<my-element text="123"></my-element>`;

            // Then
            expect(log.warn).toBeCalledWith('(ZM-4643) Attribute "text" is not declared on element "MyElement".');
        });
    });
});
