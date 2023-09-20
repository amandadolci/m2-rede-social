import { createUserCard } from './render.js';

export function createModal(id, array) {
  const object = array.find(post => post.id == id);

  const modalContainer = document.createElement('div');
  const modalCloseButton = document.createElement('button');
  const userContainer = createUserCard(object);
  const postTitle = document.createElement('h1');
  const postArticle = document.createElement('p');

  modalContainer.classList = 'modal__container';

  modalCloseButton.classList = 'modal__container--closeButton';
  modalCloseButton.innerText = 'X';

  postTitle.classList = 'posts__card--title';
  postTitle.innerText = object.title;

  postArticle.classList = 'posts__card--article';
  postArticle.innerText = object.text;

  modalContainer.append(
    modalCloseButton,
    userContainer,
    postTitle,
    postArticle
  );

  return modalContainer;
}

export function closeModal() {
  const modal = document.querySelector('.modal__controller');
  const closeButton = document.querySelector('.modal__container--closeButton');

  closeButton.addEventListener('click', () => {
    modal.close();
  });
}
