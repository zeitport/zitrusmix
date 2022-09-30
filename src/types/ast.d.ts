import type {DocumentFragment, Document} from 'parse5/dist/tree-adapters/default';
import type {Element, ChildNode} from 'parse5/dist/tree-adapters/default';

export interface Node {
    tagName?: string;
    nodeName?: string;
    childNodes?: Array<Node>;
    attrs?: Array<Attribute>;
}

export interface Attribute {
    name: string;
    value: string;
}

export type DocumentFragment = DocumentFragment;
export type Document = Document;
export type Element = Element;
export type ChildNode = ChildNode;
export type ChildElement = ChildNode & Element;

export type nodeCallbackFn = function(ChildNode): boolean;
export type ElementCallbackFn = function(Element): boolean;

export type MaybeElement = Element | unknown | Record;
