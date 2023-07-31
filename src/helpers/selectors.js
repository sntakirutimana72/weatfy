import { isNil } from './utils.js';

export const $attrib = (element, name, value) => {
  if (isNil(value)) {
    return element.getAttribute(name);
  }
  element.setAttribute(name, value);
};

export const $select = (cssSelector) => document.querySelector(cssSelector);

export const $selectAll = (cssSelector) => document.querySelectorAll(cssSelector);

export const $text = (element, value) => {
  if (isNil(value)) {
    return element.textContent;
  }
  element.textContent = value;
};

export const $class = (element, className, force) => {
  element.classList.toggle(className, force);
};

export const $create = (tagName) => document.createElement(tagName);

export const $html = (element, html) => {
  if (isNil(html)) {
    return element.innerHTML;
  }
  element.innerHTML = html;
};
