# Feature: head

## Global head.js



## Page HTML

```html
<head>
    <meta name="description" content="Vida - The best fruit blogger from Italy.">
    <meta name="zitrusmix.route" content="/about-me" />
    <title>About me</title>
</head>
```

<div class="notice">

__💡 Notice__ 
- The Zitrusmix meta tags are not delivered (rendered) to clients.
- Meta tags from the page HTML override global head.js meta content.

</div>

## Meta

Zitrusmix can handle some special meta tags.

### zitrusmix.route

The path for a page is determined by this priority:

- meta `zitrusmix.route` (e.g.: /about-me)
- filepath (e.g.: ./app/pages/about.html) 

<style>
.notice {
    border-left: 0.5rem solid #e0e000;
    margin: 1rem 0;
    padding: 1rem;
}
</style>
