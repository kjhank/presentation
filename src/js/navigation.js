export default class Navigation {
  constructor() {
    this.config = {};
    this.playBtn = document.querySelector('[data-play]');
    this.pages = document.querySelectorAll('.presentation__page');
    this.game = document.querySelector('.game');
    this.init();
  }

  init() {
    this.initEvents();
  }

  initEvents() {
    this.playBtn.addEventListener('click', () => this.showGame());
  }

  showGame() {
    this.pages.forEach(page => page.removeAttribute('data-current'));
    this.pages.forEach(page => page.removeAttribute('data-next'));
    this.pages.forEach(page => page.removeAttribute('data-previous'));
    this.game.setAttribute('data-current', '');
    this.game.previousElementSibling.setAttribute('data-previous', '');
    this.game.nextElementSibling.setAttribute('data-next', '');
  }
}
