import { HtmlTemplateResult } from '../src/tags/HtmlTemplateResult.js';
import { Attribute } from './ast';
import { html } from './html';

// export type html = function(strings, ...values): HtmlTemplateResult

export interface ZitrusmixOptions {
    app: string | readonly string[];
}

export interface RouteContext {
    html: html
}

export interface StyleContext {
    css: css
}

export type routeCallback = function(RouteContext): HtmlTemplateResult;
export type ElementName = string;
