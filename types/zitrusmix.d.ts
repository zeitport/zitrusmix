import { TemplateResult } from '../templateResult';
import { Attribute } from './ast';
import { html } from './html';

// export type html = function(strings, ...values): TemplateResult

export interface ZitrusmixOptions {
    app: string | readonly string[];
}

export interface ElementContext {
    html: html,
    attrs: Record<string, string>,
    attributes: Attribute[]
}

export interface RouteContext {
    html: html
}

export interface StyleContext {
    css: css
}

export type renderFn = function(ElementContext): TemplateResult;
export type styleFn = function(StyleContext): StyleResult;

export type routeCallback = function(RouteContext): TemplateResult;