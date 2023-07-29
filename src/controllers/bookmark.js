import storage from "../helpers/storage.js";
import { isEmpty } from "../helpers/utils.js";

export default class {
  static getBookmarks() {
    const { bookmarks } = storage;
    return isEmpty(bookmarks) ? ['Kigali'] : bookmarks;
  }

  static addBookmark(city) {
    storage.bookmarks.push(city)
  }

  static removeBookmark(city) {
    storage.bookmarks = storage.bookmarks.filter(item => item !== city)
  }
}
