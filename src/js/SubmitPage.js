import RenderPage from './RenderPage';

export default class SubmitPage {
  constructor() {
    this.render = new RenderPage();
  }

  initialPage() {
    this.render.init();
    this.submitBtn();
  }

  submitBtn() {
    const btnPage = document.querySelectorAll('.organaizer__icon');
    const inputHeader = document.querySelector('.organaizer__icon--input');
    btnPage.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.name === 'btnSearch') {
          this.render.renderSearch();
        }
        if (item.name === 'btnClip') {
          inputHeader.dispatchEvent(new MouseEvent('click'));
        }
      });
    });
  }
}
