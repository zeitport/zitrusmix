import { html } from 'zitrusmix';

export default async function head() {
    return html`
        <head>
            <meta charset="utf-8">
            <title>Fruitstore</title>
            <link rel="stylesheet" href="/static/styles.css">
            <link rel="icon" href="/static/favicon.svg">
        </head>
    `;
}
