import { html } from 'zitrusmix';

export default function head() {
    return html`
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">

            <link rel="stylesheet" href="/static/styles.css">
            <link rel="icon" href="/static/favicon.svg">
            <link rel="stylesheet" href="/mix/styles.css">
        </head>
    `;
}
