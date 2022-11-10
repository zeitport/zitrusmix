export function formatHtml(html: string): string {
    return html
        .replaceAll(/>[\t\s]*</g, '><');
}
