/**
 *
 * @param { HTMLElement | string } element
 * @param { string } name
 * @param { string? } value
 * @returns { string | void }
 */
export const $attrib = (element, name, value) => {
  if (typeof element === 'string') element = $select(element);
  if (typeof value !== 'string') return element.getAttribute(name);
  element.setAttribute(name, value);
};

/**
 *
 * @param {String} identifer
 */
export const $select = (identifer) => {
  return document.querySelector(identifer);
};

/**
 *
 * @param {String} identifer
 */
export const $selectAll = (identifer) => {
  return document.querySelectorAll(identifer);
};

/**
 *
 * @param { HTMLElement } element
 * @param { String? } value
 * @return {String?}
 */
export const $text = (element, value) => {
  if (typeof value !== 'string') {
    return element.textContent;
  }

  element.textContent = value;
};

/**
 *
 * @param { HTMLElement } element
 * @param { string } className
 * @param { Boolean? } force
 */
export const $class = (element, className, force) => {
  element.classList.toggle(className, force);
};

/**
 *
 * @param {String} tagName ~ a known name to the document to be used to create an html element
 * @returns
 */
export const $create = (tagName) => {
  return document.createElement(tagName);
};

/**
 *
 * @param {HMTLElement} element ~ an html element to/from which the content is added or retrieved
 * @param {String?} htmlContent ~ when provided, is added to the element,
                                  else we retrieve content from element.
 * @returns
 */
export const $html = (element, html) => {
  if (typeof html !== 'string') {
    return element.innerHTML;
  }

  element.innerHTML = html;
};
