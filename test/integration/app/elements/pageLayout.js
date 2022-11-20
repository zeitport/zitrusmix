import { MixElement, css } from 'zitrusmix';

export class PageLayout extends MixElement {
    static elementName = 'page-layout';

    static styles = css`
        .page {
            font-size: 1rem;
        }
    `;

    render({html}) {
        return html`
            <header>
            </header>
            <main>
            </main>
            <footer>
            </footer>
        `;
    }
}
