import interact from 'interactjs';

export default class Game {
  constructor() {
    this.config = {
      classes: {
        dialogActive: 'game__congrats--active',
      },
    };
    this.congratsDialog = document.querySelector('.game__congrats');
    this.items = document.querySelectorAll('.game__symptom');
    this.audioElem = document.querySelector('[data-audio]');
    this.score = 0;
    this.init();
  }

  init() {
    interact('[data-symptom]').draggable({
      onstart: event => {
        const { target } = event;
        const rotation = Math.floor(Math.random() * (110 - 70) + 70);

        target.setAttribute('data-rotation', `${rotation}`);
        target.setAttribute('data-dragging', '');
        if (target.hasAttribute('data-dropped')) {
          this.score--;
          target.removeAttribute('data-dropped');
        }
      },
      onend: event => {
        const { target } = event;
        target.removeAttribute('data-dragging');
      },
      onmove: event => {
        const {
          dx: deltaX,
          dy: deltaY,
          target,
        } = event;

        const dataX = target.getAttribute('data-x');
        const dataY = target.getAttribute('data-y');
        const initialX = parseFloat(dataX) || 0;
        const initialY = parseFloat(dataY) || 0;
        const newX = initialX + deltaX;
        const newY = initialY + deltaY;
        // const { rotation } = target.dataset;

        target.style.transform = `translate(${newX}px, ${newY}px)`;

        target.setAttribute('data-x', newX);
        target.setAttribute('data-y', newY);
      },
    });

    interact('.game__basket').dropzone({
      accept: '.game__symptom',
      overlap: 0.05,
      ondragenter: event => {
        const { target: dropzone } = event;
        dropzone.setAttribute('data-mouseover', '');
      },
      ondragleave: event => {
        const { target: dropzone } = event;
        dropzone.removeAttribute('data-mouseover');
      },
      ondrop: this.handleDrop.bind(this),
    });
  }

  handleDrop(event) {
    const { relatedTarget: item, target: dropzone } = event;
    const { rotation } = item.dataset;

    dropzone.removeAttribute('data-mouseover');
    if (item.dataset.illness === dropzone.dataset.illness || item.dataset.all === 'true') {
      if (item.dataset.all === 'true') {
        const targetIllness = dropzone.dataset.illness === 'asthma' ? 'codp' : 'asthma';
        const [, secondClass] = item.classList;
        const targetElem = document.querySelector(`.${secondClass}`);
        targetElem.removeAttribute('data-all');
        targetElem.setAttribute('data-illness', targetIllness);
      }

      item.setAttribute('data-dropped', '');
      item.style.transform += ` rotate(-${rotation}deg)`;
      this.audioElem.src = 'assets/sfx-correct.mp3';
      this.audioElem.muted = false;
      this.audioElem.play();
      this.updateScore();
      this.checkScore();
    } else {
      this.audioElem.src = 'assets/sfx-incorrect.mp3';
      this.audioElem.muted = false;
      this.audioElem.play();
      item.removeAttribute('style');
      item.removeAttribute('data-x');
      item.removeAttribute('data-y');
    }
  }

  updateScore() {
    this.score++;
  }

  checkScore() {
    const {
      classes: {
        dialogActive: active,
      },
    } = this.config;

    if (this.score === this.items.length) {
      this.audioElem.src = 'assets/sfx-won.mp3';
      this.audioElem.play();
      this.congratsDialog.classList.add(active);
    }
  }

  reset() {
    const {
      classes: {
        dialogActive: active,
      },
    } = this.config;

    this.score = 0;
    this.items.forEach(item => {
      ['data-dropped', 'data-x', 'data-y', 'style'].forEach(attribute => item.removeAttribute(attribute));
    });

    this.congratsDialog.classList.remove(active);
  }
}
