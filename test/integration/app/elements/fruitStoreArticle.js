import { MixElement, css } from 'zitrusmix';

export class FruitStoreArticle extends MixElement {
    static elementName = 'fruit-store-article';

    static styles = css`
        .headline {
            font-size: 3rem;
            color: #808030;
        }
    `;

    title = this.attribute('title');

    slug = this.page.parameter('slug');

    async render(context) {
        const {html, page} = context;

        return html`
            <fruit-store-header>Article ${page.params.slug}</fruit-store-header>
        `;
    }
}
