import { isNil } from './utils.js';

/**
 *
 * @param { Element } element
 * @param { string } name
 * @param { string? } value
 * @returns
 */
export const $attrib = (element, name, value) => {
  if (isNil(value)) {
    return element.getAttribute(name);
  }
  element.setAttribute(name, value);
};

/**
 *
 * @param { Element } element
 * @param { string } name
 */
export const $removeAttrib = (element, name) => {
  element.removeAttribute(name);
};

/**
 *
 * @param { string } cssSelector
 * @returns
 */
export const $select = (cssSelector) => document.querySelector(cssSelector);

/**
 *
 * @param { string } cssSelector
 * @returns
 */
export const $selectAll = (cssSelector) => document.querySelectorAll(cssSelector);

/**
 *
 * @param { Element } element
 * @param { string? } value
 * @returns
 */
export const $text = (element, value) => {
  if (isNil(value)) {
    return element.textContent;
  }
  element.textContent = value;
};

/**
 *
 * @param { Element } element
 * @param { string } className
 * @param { boolean|undefined } force
 */
export const $class = (element, className, force) => {
  element.classList.toggle(className, force);
};

/**
 *
 * @param { string } tagName
 * @returns
 */
export const $create = (tagName) => document.createElement(tagName);

/**
 *
 * @param { Element } element
 * @param { string? } html
 * @returns
 */
export const $html = (element, html) => {
  if (isNil(html)) {
    return element.innerHTML;
  }
  element.innerHTML = html;
};
