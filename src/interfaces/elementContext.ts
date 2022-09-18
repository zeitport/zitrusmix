import type {Attribute} from '../utils/ast.js';
import {html} from '../tags/html.js';

/**
 * The render context for MixElements
 *
 * @example
 * render({html}) {
 *   return html`<h1>Hello</h1>`;
 * }
 */
export interface ElementContext {
    html: typeof html,
    attrs: Record<string, string>,
    attributes: Attribute[]
}
