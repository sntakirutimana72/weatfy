export default class {
  static themeId = 'weatfy_dksjasur9roajsoaidgaaQefjqtyrAXFruaif'

  static commit(newTheme) {
    localStorage.setItem(this.themeId, newTheme);
  }

  static systemPrefers() {
    return (
      ('matchMedia' in window && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark'
        : 'light'
    );
  }

  static fetch() {
    return localStorage.getItem(this.themeId);
  }

  static isDarkMode() {
    const theme = this.fetch() || this.systemPrefers();
    return theme === 'dark';
  }

  static changeMode() {
    const newTheme = this.fetch() === 'light' ? 'dark' : 'light';
    this.commit(newTheme);
  }
}
