export default class Navigation {
  constructor(game) {
    this.config = {};
    this.playBtn = document.querySelector('[data-play]');
    this.nextBtn = document.querySelector('[data-nav-next');
    this.homeBtn = document.querySelector('[data-nav-home]');
    this.pages = document.querySelectorAll('.presentation__page');
    this.gamePage = document.querySelector('.game');
    this.disclaimerPage = document.querySelector('.disclaimer');
    this.startPage = document.querySelector('.start');
    this.game = game;

    this.init();
  }

  init() {
    this.initEvents();
  }

  initEvents() {
    this.playBtn.addEventListener('click', event => this.showGame(event));
    this.nextBtn.addEventListener('click', event => this.showDisclaimer(event));
    this.homeBtn.addEventListener('click', event => this.goHome(event));
  }

  showGame(event) {
    event.preventDefault();
    this.pages.forEach(page => page.removeAttribute('data-current'));
    this.pages.forEach(page => page.removeAttribute('data-next'));
    this.pages.forEach(page => page.removeAttribute('data-previous'));
    this.gamePage.setAttribute('data-current', '');
    this.gamePage.previousElementSibling.setAttribute('data-previous', '');
    this.gamePage.nextElementSibling.setAttribute('data-next', '');
  }

  showDisclaimer(event) {
    event.preventDefault();
    this.pages.forEach(page => page.removeAttribute('data-current'));
    this.pages.forEach(page => page.removeAttribute('data-next'));
    this.pages.forEach(page => page.removeAttribute('data-previous'));
    this.disclaimerPage.setAttribute('data-current', '');
    this.disclaimerPage.previousElementSibling.setAttribute('data-previous', '');
  }

  goHome(event) {
    event.preventDefault();
    this.pages.forEach(page => page.removeAttribute('data-current'));
    this.pages.forEach(page => page.removeAttribute('data-next'));
    this.pages.forEach(page => page.removeAttribute('data-previous'));
    this.startPage.setAttribute('data-current', '');
    this.startPage.nextElementSibling.setAttribute('data-next', '');

    this.game.reset();
  }
}
