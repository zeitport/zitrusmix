import { MixElement, css, mixElements } from 'zitrusmix';

class PageLayout extends MixElement {
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

mixElements.define('page-layout', PageLayout);
