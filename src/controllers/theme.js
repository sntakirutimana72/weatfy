import { $select, $class } from '../helpers/selectors.js';
import { ThemeStore } from '../stores/index.js';

export default class {
  static switchBtn = $select('#theme-switch')

  static initiate() {
    if (ThemeStore.isDarkMode()) {
      this.flag();
    }

    this.switchBtn.addEventListener('click', this.changeTheme);

    if ('matchMedia' in window) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', this.changeThemeBySystemPreference);
    }
  }

  static unbinPrefersColor() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.changeThemeBySystemPreference);
  }

  static flag() {
    $class(document.body, 'dark');
    Array.from(this.switchBtn.children).forEach((icon) => { $class(icon, 'hidden'); });
  }

  static changeThemeBySystemPreference = () => {
    if (ThemeStore.fetch()) {
      this.unbinPrefersColor();
    } else {
      this.flag();
    }
  }

  static changeTheme = () => {
    ThemeStore.changeMode();
    this.flag();
  }
}
