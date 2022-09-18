import { MixElement, css} from 'zitrusmix';

export class FruitStoreHeader extends MixElement {
    static elementName = 'fruit-store-header';
    tooltip = this.attribute('tooltip');

    static styles = css`
        .headline {
            font-size: 3rem;
            color: #808030;
        }
    `;

    async render({html}) {
        const {tooltip} = this;

        return html`
            <header>
                <h1 class="headline" title="${tooltip}"><slot></slot></h1>
            </header>
        `;
    }
}
