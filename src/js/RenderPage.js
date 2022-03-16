import images from './images';

export default class RenderPage {
  constructor() {
    this.conteiner = document.querySelector('.conteiner');
    this.images = images;
    this.btnHeaderBox = null;
    this.header = null;
    this.previewBox = null;
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
               <img name="btnMenu" class="organaizer__icon" src="${this.images.dots}">
            </div>
         </div>
         <div class="organaizer__main"></div>
         <div class="organaizer__footer">
          <div class="footer-conteiner">
              <img name="btnSmile" src="${this.images.smile}" class="organaizer__icon">
              <textarea class="organaizer__footer-send" rows="1"></textarea>
              <div class="organaizer__box-icon">
                <img name="btnVoice" src="${this.images.voice}" class="organaizer__icon">
              </div>                       
                <input class="organaizer__icon--input" multiple id='fileAdd' type="file" accept="image/*, video/*,.doc,.docx,.pdf,audio/*">
                <img id="btnClip" src="${this.images.clip}" class="organaizer__icon">
            </div>
            <div class="preview-box">
            <div>                     
         </div>
      </div>
    `);
    this.conteiner.insertAdjacentElement('beforeend', organaizer);
    this.previewBox = document.querySelector('.preview-box');
  }

  renderMenu() {
    const menu = document.createElement('ul');
    menu.classList.add('organaizer__menu');
    menu.insertAdjacentHTML('beforeend', `
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
    this.conteiner.insertAdjacentElement('beforeend', menu);
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

  deletPreveiw(arr, element) {


  }
}
