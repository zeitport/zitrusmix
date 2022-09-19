import {route} from 'zitrusmix';

route('/', index);

async function index({html}) {
    return html`<fruit-store-header></fruit-store-header>`;
}
