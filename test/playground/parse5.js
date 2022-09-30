import * as parse5 from 'parse5';

// https://astexplorer.net/#/1CHlCXc4n4
const document = parse5.parse(`
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/static/styles.css">
    <link rel="icon" href="/static/favicon.svg">
</head>
`);

console.log(document.childNodes[0]);

const updatedFragment = parse5.serialize(document.childNodes[0].childNodes[0]);
console.log(updatedFragment);
