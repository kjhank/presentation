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
    this.score = 0;
    this.init();
  }

  init() {
    interact('[data-symptom]').draggable({
      onstart: event => {
        const { target } = event;
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
      onmove: (event) => {
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
      this.updateScore();
      this.checkScore();
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
