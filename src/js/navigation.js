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
    this.audioElem = document.querySelector('[data-audio]');
    this.musicElem = document.querySelector('[data-music]');
    this.muteMusicButton = document.querySelector('[data-music-mute]');

    this.init();
  }

  init() {
    this.initEvents();
  }

  initEvents() {
    this.playBtn.addEventListener('click', event => this.showGame(event));
    this.nextBtn.addEventListener('click', event => this.showDisclaimer(event));
    this.homeBtn.addEventListener('click', event => this.goHome(event));
    this.muteMusicButton.addEventListener('click', event => this.toggleMute(event));
  }

  toggleMute(event) {
    event.preventDefault();

    if (this.musicElem.paused) {
      this.musicElem.play();
    } else {
      this.musicElem.pause();
    }

    this.muteMusicButton.querySelector('img:last-child').classList.toggle('game__music-image--hidden');
  }

  showGame(event) {
    event.preventDefault();
    this.musicElem.play();
    this.musicElem.src = 'assets/music.mp3';
    this.musicElem.muted = false;
    this.musicElem.play();
    this.audioElem.play();
    this.audioElem.src = 'assets/sfx-incorrect.mp3';
    this.audioElem.muted = false;
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
