import { assert, describe, it } from 'vitest';
import { css, html, MixElement } from '../sandbox.js';

class MyHeader extends MixElement {
    styles() {
        return css`
            .headline {
                font-size: 3rem;
                color: #808030;
            }
        `;
    }

    /**
     * @returns {import('zitrusmix').HtmlTemplateResult}
     */
    render() {
        return html`
            <header>
                <h1 class="headline">🍋 Zitrusmix Fruit Store</h1>
            </header>
        `;
    }
}

describe('MyHeader', function () {
    it('can be constructed', function () {
        const header = new MyHeader();

        assert.instanceOf(header, MyHeader);
    });
});
