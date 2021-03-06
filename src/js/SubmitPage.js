import {
  v4 as uuidv4,
} from 'uuid';
import RenderPage from './RenderPage';
import images from './images';

export default class SubmitPage {
  constructor() {
    this.images = images;
    this.render = new RenderPage();
    this.files = [];
    this.btnClosePrev = null;
    this.btnSmile = null;
    this.btnCloseSmile = null;
    this.boxIconRecord = null;
    this.textarea = null;
    this.btnSend = null;
    this.smile = null;
    this.menu = null;
    this.audio = null;
  }

  initialPage() {
    this.render.init();
    this.render.renderMenu();
    this.submitBtn();
    this.submitInputFile();
    this.textareSubmit();
    this.recordAudioInit();
  }

  submitBtn() {
    this.menu = document.querySelector('.organaizer__menu');
    const btnPage = document.querySelectorAll('.organaizer__icon');
    btnPage.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (item.name === 'btnSearch') {
          if (this.menu.classList.contains('organaizer__menu--active')) {
            this.menu.classList.remove('organaizer__menu--active');
          }
          this.render.renderSearch();
        }
        if (item.id === 'btnSmile') {
          this.btnCloseSmile = document.querySelector('#btnClose');
          this.render.renderSmileBox();
          this.smile = document.querySelectorAll('.organaizer__smile');
          this.btnCloseSmile.classList.remove('organaizer__icon--deactive');
          item.classList.add('organaizer__icon--deactive');
          this.addSmileTextarea();
        }
        if (item.id === 'btnClose') {
          this.btnSmile = document.querySelector('#btnSmile');
          this.render.deletSmileBox();
          item.classList.add('organaizer__icon--deactive');
          this.btnSmile.classList.remove('organaizer__icon--deactive');
        }
        if (item.id === 'btnMenu') {
          this.menu.classList.toggle('organaizer__menu--active');
        }
        if (item.id === 'btnSend') {
          const input = document.getElementById('fileAdd');
          const formData = new FormData();
          const files = Array.from(input.files);
          files.forEach((item) => {
            formData.append('file', item);
          });
          formData.append('text', this.textarea.value);

          fetch('http://localhost:8080/upload', {
            body: formData,
            method: 'POST',
          }).then((respone) => {
            console.log(respone);
          });
        }
      });
    });
  }

  recordAudioInit() {
    navigator.mediaDevices.getUserMedia({
      audio: true,
    }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      document.querySelector('#btnVoice').addEventListener('mousedown', () => {
        console.log('start');
        mediaRecorder.start();
      });

      mediaRecorder.addEventListener('dataavailable', (e) => {
        console.log('avail');
        chunks.push(e.data);
      });

      document.querySelector('#btnVoice').addEventListener('mouseup', () => {
        console.log('stop');
        mediaRecorder.stop();
      });

      mediaRecorder.addEventListener('stop', () => {
        this.audio = new Blob(chunks, {
          type: 'audio/wav',
        });
        const formData = new FormData();
        formData.append('file', this.audio);
        console.log(this.audio);
        fetch('http://localhost:8080/upload', {
          body: formData,
          method: 'POST',
        }).then((respone) => {
          console.log(respone);
        });
      });
    });
  }

  addSmileTextarea() {
    this.smile.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.textarea.focus();
        const index = this.textarea.selectionStart;
        const arrString = Array.from(this.textarea.value);
        const smileElement = item.textContent;
        arrString.splice(index, 0, smileElement);
        this.textarea.value = arrString.join('');
        this.textarea.setSelectionRange(index + 2, index + 2);
      });
    });
  }

  submitInputFile() {
    const btnClip = document.querySelector('#btnClip');
    this.inputHeader = document.querySelector('.organaizer__icon--input');
    btnClip.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.menu.classList.contains('organaizer__menu--active')) {
        this.menu.classList.remove('organaizer__menu--active');
      }
      this.inputHeader.dispatchEvent(new MouseEvent('click'));
    });
    this.inputHeader.addEventListener('change', (evt) => {
      const files = Array.from(evt.currentTarget.files);
      files.forEach((file) => {
        const index = this.files.findIndex((item) => item.name === file.name);
        if (index === -1) {
          file.id = uuidv4();
          this.files.push(file);
        }
      });
      this.renderPrew();
    });
  }

  deletFileInput() {
    this.btnClosePrev.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('preview__close')) {
          const index = this.files.findIndex((element) => element.id === e.currentTarget.id);
          this.files.splice(index, 1);
          this.renderPrew();
        }
      });
    });
  }

  renderPrew() {
    if (this.files.length === 0 && this.btnClosePrev !== null) {
      this.render.previewAddCard(this.files);
      this.btnClosePrev = null;
      this.viewBtnSend(false);
    }
    if (this.files.length !== 0) {
      this.viewBtnSend(true);
      this.render.previewAddCard(this.files);
      this.btnClosePrev = document.querySelectorAll('.preview-box__card');
      this.deletFileInput();
    }
  }

  textareSubmit() {
    this.textarea = document.querySelector('.organaizer__footer-send');
    this.boxIconRecord = document.querySelector('.organaizer__box-icon');
    this.btnSend = document.querySelector('#btnSend');
    this.textarea.addEventListener('input', (e) => {
      e.preventDefault();
      if (this.menu.classList.contains('organaizer__menu--active')) {
        this.menu.classList.remove('organaizer__menu--active');
      }
      this.smileIndex = null;
      this.textarea.style.height = 'auto';
      if (this.textarea.clientHeight < this.textarea.scrollHeight) {
        this.textarea.style.height = `${this.textarea.scrollHeight}px`;
      }
      if (this.textarea.value.trim() !== '') {
        this.viewBtnSend(true);
      }
      if (this.textarea.value.trim() === '') {
        this.viewBtnSend(false);
      }
    });
  }

  viewBtnSend(state) {
    if (state === true) {
      this.boxIconRecord.style.display = 'none';
      this.btnSend.classList.remove('organaizer__icon--deactive');
    }
    if (state === false) {
      this.boxIconRecord.style.display = 'flex';
      this.btnSend.classList.add('organaizer__icon--deactive');
    }
  }
}
