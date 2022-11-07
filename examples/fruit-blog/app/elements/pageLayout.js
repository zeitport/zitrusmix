import { MixElement, html, mixElements } from '../../../../src';

class PageLayout extends MixElement {
    static styles = html`
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
