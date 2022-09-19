/**
 *
 * @param {{nodeName: string}} node
 * @returns
 */
export function isCustomElement(node) {
    return node.nodeName.includes('-');
}
