import galleryItems from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('ul.js-gallery'),
  modalImg: document.querySelector('img.lightbox__image'),
  overlayVisible: document.querySelector('.lightbox'),
  buttonCloseOverlay:document.querySelector('button[data-action="close-lightbox"]')
}



// const addGalleryItem = galleryItems.reduce((acc,item)=>{
//     return acc.concat(`<li class="gallery__item">
//   <a class="gallery__link" href="${item.original}" <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}" />
//   </a>
// </li>`)
// },'')

// refs.galleryListHandler.insertAdjacentHTML('afterbegin',addGalleryItem)
const callbackGallery = item => {
  const galleryListItem = document.createElement('li');
galleryListItem.classList.add('gallery__item');

const galleryListLink = document.createElement('a');
galleryListLink.classList.add('gallery__link');
galleryListLink.href = item.original;

const galleryListImg = document.createElement('img');
galleryListImg.classList.add('gallery__image');
galleryListImg.src = item.preview;
galleryListImg.dataset.source = item.original;
galleryListImg.alt = item.description;
  
  galleryListLink.appendChild(galleryListImg);
  galleryListItem.appendChild(galleryListLink);
  return galleryListItem;
}

const galleryListHandler = galleryItems.map(item => callbackGallery(item));
refs.galleryList.append(...galleryListHandler);


refs.galleryList.addEventListener('click', onItemClick)

function onItemClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    
    return
  }
  refs.overlayVisible.classList.add('is-open')
  const currentImgLink = event.target.dataset.source;
  refs.modalImg.src = currentImgLink;
  refs.buttonCloseOverlay.addEventListener('click', () => {
  refs.overlayVisible.classList.remove('is-open')
    refs.modalImg.src = '';
    
});

}


