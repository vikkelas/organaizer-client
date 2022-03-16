import RenderPage from './RenderPage';

export default class SubmitPage {
  constructor() {
    this.render = new RenderPage();
    this.inputHeader = null;
    this.files = [];
  }

  initialPage() {
    this.render.init();
    this.submitBtn();
    this.submitInputFile();
  }

  submitBtn() {
    const btnPage = document.querySelectorAll('.organaizer__icon');
    btnPage.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.name === 'btnSearch') {
          this.render.renderSearch();
        }
      });
    });
  }

  submitInputFile() {
    const btnClip = document.querySelector('#btnClip');
    this.inputHeader = document.querySelector('.organaizer__icon--input');
    btnClip.addEventListener('click', (e) => {
      e.preventDefault();
      this.inputHeader.dispatchEvent(new MouseEvent('click'));
    });
    this.inputHeader.addEventListener('change', (evt) => {
      const files = Array.from(evt.currentTarget.files);
      files.forEach((file) => {
        const index = this.files.findIndex((item) => item.name === file.name);
        if (index === -1) {
          this.files.push(file);
        }
      });
      this.render.previewAddCard(this.files);
      this.deletFIleInput();
    });
  }

  deletFIleInput() {
    // дописать UUID
    const btnClosePrev = document.querySelector('.preview-box__card');
    btnClosePrev.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('preview__close')) {
        this.render.deletPreveiw(this.files, e.currentTarget);
      }
    });
  }
}
