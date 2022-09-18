# Feature: head

## Global head.js



## Page HTML

```html
<head>
    <meta name="description" content="Vida - The best fruit blogger from Italy.">
    <meta name="zitrusmix.route" content="/about-me" />
    <title>Vida - About me</title>
</head>
```

> **Note**
> - The Zitrusmix meta tags are not delivered (rendered) to clients.
> - Meta tags from the page HTML override global head.js meta content.

## Meta

Zitrusmix can handle some special meta tags.

### zitrusmix.route

The path for a page is determined by this priority:

- meta `zitrusmix.route` (e.g.: /about-me)
- filepath (e.g.: ./app/pages/about.html) 


## Possible problems
- [_ZM-1173_: head.js not found](../help/ZM-1173.md)
