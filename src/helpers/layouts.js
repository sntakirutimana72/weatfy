import { $attrib, $class, $create, $text } from "./selectors.js";

export const countryOrCityLayout = (name, className) => {
  const element = $create('button');

  $class(element, className);
  $attrib(element, 'type', 'button');
  $attrib(element, 'data-key', name);
  $attrib(element, 'data-filter', name.toLowerCase());
  $text(element, name);

  return element;
};
