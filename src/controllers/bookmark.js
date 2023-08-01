import { $select, $attrib, $class, $removeAttrib } from '../helpers/selectors.js';
import { BookmarkStore } from '../stores/index.js';
import storage from '../helpers/storage.js';

export default class {
  static bookmarker = $select('#bookmarker');

  static initiate() {
    storage.bookmarks = BookmarkStore.fetch();
    this.bookmarker.addEventListener('click', this.handleBookmark);
  }

  static reset() {
    $class(this.bookmarker.children[0], 'active', false);
    $removeAttrib(this.bookmarker, 'data-target');
    $removeAttrib(this.bookmarker, 'title');
  }

  /**
   *
   * @param { string } city
   * @param { boolean|undefined } enforce
   */
  static flag(city, enforce) {
    if (enforce) {
      $attrib(this.bookmarker, 'data-target', city);
    }
    const force = storage.bookmarks.includes(city);
    const title = force ? 'Favorite' : 'Bookmark';
    
    $attrib(this.bookmarker, 'title', title);
    $class(this.bookmarker.children[0], 'active', force);
  }

  static handleBookmark = () => {
    const city = $attrib(this.bookmarker, 'data-target');

    if (BookmarkStore.fetch().includes(city)) {
      storage.bookmarks = BookmarkStore.remove(city);
    } else {
      storage.bookmarks = BookmarkStore.add(city);
    }
    this.flag(city);
  }
}
