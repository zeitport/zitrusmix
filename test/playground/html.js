import { element } from '../../src/index.js';
import { html } from '../../src/html.js';


element('actor-card', ({ html }) => html`<slot name="first"></slot><slot name="last"></slot>`);

const result = html`<actor-card><p slot="last">Bond</p><p slot="first">James</p></actor-card>`;

console.log(result);
