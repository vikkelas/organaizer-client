import images from './images';
import emojiArr from './emojiArr';

export default class RenderPage {
  constructor() {
    this.conteiner = document.querySelector('.conteiner');
    this.images = images;
    this.emojiArr = emojiArr;
    this.btnHeaderBox = null;
    this.header = null;
    this.previewBox = null;
    this.footer = null;
    this.smileBox = null;
  }

  init() {
    const organaizer = document.createElement('div');
    organaizer.classList.add('organaizer');
    organaizer.insertAdjacentHTML('beforeend', `
    <div class="organaizer">
         <div class="organaizer__header">            
            <img src="${this.images.logo}" class="organaizer__logo">          
            <div class="organaizer__header-btn">
               <img name="btnSearch" class="organaizer__icon" src="${this.images.search}">
               <img id="btnMenu" class="organaizer__icon" src="${this.images.dots}">
            </div>
         </div>
         <div class="organaizer__main"></div>
         <div class="organaizer__footer">
          <div class="footer-conteiner">
              <img id="btnSmile" src="${this.images.smile}" class="organaizer__icon organaizer__icon--mobile">
              <img id="btnClose" src="${this.images.close}" class="organaizer__icon organaizer__icon--deactive">
              <textarea class="organaizer__footer-send" cols="100" rows="1"></textarea>
              <div class="organaizer__box-icon">
                <img id="btnVoice" src="${this.images.voice}" class="organaizer__icon">
                <img id="btnVideo" src="${this.images.photo}" class="organaizer__icon">
              </div>
                <img id="btnSend" src="${this.images.send}" class="organaizer__icon organaizer__icon--deactive">                       
                <input class="organaizer__icon--input" multiple id='fileAdd' type="file" accept="image/*, video/*,.doc,.docx,.pdf,audio/*">
                <img id="btnClip" src="${this.images.clip}" class="organaizer__icon">
            </div>
            <div class="preview-box">
            <div>                     
         </div>
      </div>
    `);
    this.conteiner.insertAdjacentElement('beforeend', organaizer);
    this.header = document.querySelector('.organaizer__header');
    this.previewBox = document.querySelector('.preview-box');
  }

  renderMenu() {
    this.menu = document.createElement('ul');
    this.menu.classList.add('organaizer__menu');
    this.menu.insertAdjacentHTML('beforeend', `
              <li data="menu_photo" class="organaizer__menu-item">                     
                     <img src="${this.images.photo}" alt="photo" class="organaizer__menu-img">
                     <div class="organaizer__menu-title">photo</div>
                     <div class="organaizer__menu-amount">0</div>                  
              </li>
              <li data="menu_video" class="organaizer__menu-item">                     
                     <img src="${this.images.video}" alt="video" class="organaizer__menu-img">
                     <div class="organaizer__menu-title">video</div>
                     <div class="organaizer__menu-amount">0</div>                  
              </li>
               <li data="menu_voice" class="organaizer__menu-item">                     
                     <img src="${this.images.voice}" alt="voice message" class="organaizer__menu-img">
                     <div class="organaizer__menu-title">voice message</div>
                     <div class="organaizer__menu-amount">0</div>                  
               </li>
               <li data="menu_music" class="organaizer__menu-item">                     
                     <img src="${this.images.headphones}" alt="music" class="organaizer__menu-img">
                     <div class="organaizer__menu-title">music</div>
                     <div class="organaizer__menu-amount">0</div>
               </li>
               <li data="menu_links" class="organaizer__menu-item">                     
                     <img src="${this.images.link}" alt="shared links" class="organaizer__menu-img">
                     <div class="organaizer__menu-title">shared links</div>
                     <div class="organaizer__menu-amount">0</div>                  
               </li>
               <li data="menu_docs" class="organaizer__menu-item">                     
                     <img src="${this.images.docs}" alt="documents" class="organaizer__menu-img">
                     <div class="organaizer__menu-title">documents</div>
                     <div class="organaizer__menu-amount">0</div>
               </li>
    `);
    this.header.insertAdjacentElement('beforeend', this.menu);
  }

  deletMenu() {
    this.menu.remove();
  }

  renderSearch() {
    this.btnHeaderBox = document.querySelector('.organaizer__header-btn');
    this.childElement = document.querySelector('.organaizer__logo');
    this.search = document.createElement('div');
    this.search.classList.add('organaizer__custom-input');
    this.search.insertAdjacentHTML('beforeend', `
      <input class="organaizer__menu-search" placeholder="search" type="text">
      <button class="organaizer__menu-cancel">Отмена</button>
    `);
    this.btnHeaderBox.style.display = 'none';
    this.btnHeaderBox.classList.add('organaizer__header-btn--deactive');
    this.childElement.insertAdjacentElement('afterend', this.search);
    setTimeout(() => {
      this.search.classList.add('organaizer__custom-input--active');
    }, 100);
    const cancel = document.querySelector('.organaizer__menu-cancel');
    cancel.addEventListener('click', () => {
      this.deletSearch();
    });
  }

  deletSearch() {
    this.search.classList.remove('organaizer__custom-input--active');
    setTimeout(() => {
      this.search.remove();
      this.btnHeaderBox.style.display = 'flex';
      setTimeout(() => this.btnHeaderBox.classList.remove('organaizer__header-btn--deactive'), 100);
    }, 400);
  }

  previewAddCard(arrFiles) {
    this.previewBox.innerHTML = '';
    this.previewBox = document.querySelector('.preview-box');
    arrFiles.forEach((item) => {
      const preview = document.createElement('div');
      preview.classList.add('preview-box__card');
      preview.setAttribute('id', item.id);
      if (item.type.includes('image')) {
        const img = document.createElement('img');
        img.classList.add('preview__img');
        img.src = URL.createObjectURL(item);
        img.addEventListener('load', () => URL.revokeObjectURL(img.src));
        preview.insertAdjacentElement('beforeend', img);
        preview.insertAdjacentHTML('beforeend', `
        <img class="preview__close" src="${this.images.close}">
        <div class="preview__name">${item.name}</div>
        `);
      }
      if (!item.type.includes('image')) {
        let src = '';
        if (item.type.includes('audio')) {
          src = 'audio';
        }
        if (item.type.includes('pdf')) {
          src = 'pdf';
        }
        if (item.type.includes('doc')) {
          src = 'doc';
        }
        if (item.type.includes('video')) {
          src = 'avi';
        }
        preview.insertAdjacentHTML('beforeend', `
        <img class="preview__img" src="${images[src]}">
        <img class="preview__close" src="${this.images.close}">
        <div class="preview__name">${item.name}</div>
    `);
      }
      this.previewBox.insertAdjacentElement('beforeend', preview);
    });
  }

  renderSmileBox() {
    this.footer = document.querySelector('.footer-conteiner');
    this.smileBox = document.createElement('div');
    this.smileBox.classList.add('organaizer__smile-box');
    this.emojiArr.forEach((item) => {
      const smile = document.createElement('div');
      smile.classList.add('organaizer__smile');
      smile.insertAdjacentText('beforeend', item);
      this.smileBox.insertAdjacentElement('beforeend', smile);
    });
    this.footer.insertAdjacentElement('beforebegin', this.smileBox);
  }

  deletSmileBox() {
    this.smileBox.remove();
  }
}
