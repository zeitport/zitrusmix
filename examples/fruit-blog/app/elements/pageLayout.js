import { MixElement, css, mixElements } from 'zitrusmix';

class PageLayout extends MixElement {
    static styles = css``;

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

mixElements.define('page-layout', PageLayout);
