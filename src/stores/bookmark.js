import { isNil } from '../helpers/utils.js';

export default class {
  static storeId = 'kaskda03t8apodvadlkDAYwoaot9'

  /**
   *
   * @param { Set<string> } newList
   * @returns { string[] }
   */
  static commit(newList) {
    const toArray = Array.from(newList);
    localStorage.setItem(this.storeId, JSON.stringify(toArray));
    return toArray;
  }

  /**
   *
   * @returns { string[] }
   */
  static fetch() {
    const list = localStorage.getItem(this.storeId);
    return isNil(list) ? [] : JSON.parse(list);
  }

  /**
   *
   * @param { string } city
   * @returns { string[] }
   */
  static add(city) {
    const list = new Set(this.fetch());
    list.add(city);
    return this.commit(list);
  }

  /**
   *
   * @param { string } city
   * @returns { string[] }
   */
  static remove(city) {
    const list = new Set(this.fetch());
    return list.delete(city) ? this.commit(list) : Array.from(list);
  }

  static destroy() {
    localStorage.removeItem(this.storeId);
  }
}
