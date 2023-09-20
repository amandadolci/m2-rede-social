import { renderPostsList } from './render.js';

export function registerPost(array) {
  const userIcon = document.querySelector('.user__container--icon');
  const userName = document.querySelector('.user__container--name');
  const userRole = document.querySelector('.user__container--role');
  const inputTitle = document.querySelector('.publish__container--title');
  const inputArticle = document.querySelector('.publish__container--article');
  const newPost = {};

  if (inputTitle.value == '' || inputArticle.value == '') {
    alert('Por favor preencha os campos necessários');
  } else {
    newPost.id = array.length + 1;
    newPost.title = inputTitle.value;
    newPost.text = inputArticle.value;
    newPost.user = userName.innerHTML;
    newPost.stack = userRole.innerHTML;
    newPost.img = userIcon.src;
    newPost.likes = 0;

    array.unshift(newPost);

    inputTitle.value = '';
    inputArticle.value = '';
  }
}

export function publishPost(array) {
  const publishButton = document.querySelector('.publish__container--button');

  publishButton.addEventListener('click', event => {
    event.preventDefault();

    registerPost(array);
    renderPostsList(array);
  });
}
