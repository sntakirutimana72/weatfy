/**
 *
 * @param { Array<any> | Object } obj
 * @returns
 */
export const isEmpty = (obj) => {
  if (Array.isArray(obj)) {
    return obj.length === 0;
  } else if (obj instanceof Object) {
    return Object.keys(obj).length === 0;
  } else {
    throw new TypeError('Must be of type <Array type> or <Object type>')
  }
}

/**
 * returns FALSE if given obj is undefined, otherwise TRUE.
 * @param obj
 * @returns
 */
export const isInit = (obj) =>  obj !== undefined;
