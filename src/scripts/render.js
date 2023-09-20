import { closeModal, createModal } from './modal.js';

export function renderPublisherUserCard(array) {
  const publishContainer = document.querySelector('.publish__container');
  const userContainer = document.querySelector('.user__container');
  const logoutButton = document.querySelector('.header__container--button');
  logoutButton.addEventListener('click', () => {
    renderPublisherUserCard(array);
  });

  const randomIndex = Math.floor(Math.random() * array.length);

  const user = array[randomIndex];

  const userCard = createUserCard(user);

  userContainer.remove();

  publishContainer.insertAdjacentElement('afterbegin', userCard);
}

export function renderSuggestionsList(array) {
  const suggestionsProfiles = document.querySelector(
    '.suggestions__container--profiles'
  );

  suggestionsProfiles.innerHTML = '';

  array.forEach(profile => {
    const card = createSuggestionCard(profile);
    suggestionsProfiles.appendChild(card);
  });
}

export function renderPostsList(array) {
  const postsList = document.querySelector('.posts__container--list');

  postsList.innerHTML = '';

  array.forEach(post => {
    const card = createPostCard(post);
    postsList.appendChild(card);
  });

  renderModal(array);
}

export function createUserCard(object) {
  const userContainer = document.createElement('div');
  const figure = document.createElement('figure');
  const userAvatar = document.createElement('img');
  const userName = document.createElement('h2');
  const userRole = document.createElement('small');

  userContainer.classList = 'user__container';

  userAvatar.classList = 'user__container--icon';
  userAvatar.src = object.img;
  userAvatar.alt = `${object.user} Avatar`;

  userName.classList = 'user__container--name';
  userName.innerText = object.user;

  userRole.classList = 'user__container--role';
  userRole.innerText = object.stack;

  figure.appendChild(userAvatar);
  userContainer.append(figure, userName, userRole);

  return userContainer;
}

function createSuggestionCard(profile) {
  const suggestionCard = document.createElement('li');
  const userContainer = createUserCard(profile);
  const followButton = document.createElement('button');

  suggestionCard.classList = 'suggestions__container--follow';

  followButton.classList = 'follow__container--button';
  followButton.innerText = 'Seguir';
  followButton.addEventListener('click', event => {
    if (followButton.innerText === 'Seguir') {
      event.target.classList.add('follow');
      followButton.innerText = 'Seguindo';
    } else {
      event.target.classList.remove('follow');
      followButton.innerText = 'Seguir';
    }
  });

  suggestionCard.append(userContainer, followButton);

  return suggestionCard;
}

function createPostCard(post) {
  const postCard = document.createElement('li');
  const userContainer = createUserCard(post);
  const postTitle = document.createElement('h1');
  const postArticle = document.createElement('p');
  const cardInteraction = document.createElement('div');
  const openPostButton = document.createElement('button');
  const likeContainer = document.createElement('figure');
  const likeButton = document.createElement('span');
  const likeCount = document.createElement('small');

  postCard.classList = 'posts__container--card';

  postTitle.classList = 'posts__card--title';
  postTitle.innerText = post.title;

  postArticle.classList = 'posts__card--article';
  postArticle.innerText = `${post.text.substring(0, 208)}...`;

  cardInteraction.classList = 'posts__card--interaction';

  openPostButton.classList = 'interaction__container--button';
  openPostButton.innerText = 'Abrir Post';
  openPostButton.dataset.postId = post.id;

  likeContainer.classList = 'interaction__container--like';

  likeButton.classList = 'material-symbols-rounded';
  likeButton.innerText = ' favorite ';

  likeCount.classList = 'interaction__like--count';
  likeCount.innerText = post.likes;

  likeButton.addEventListener('click', event => {
    if (!event.target.classList.contains('like')) {
      event.target.classList.add('like');
      likeCount.innerText = post.likes + 1;
    } else {
      event.target.classList.remove('like');
      likeCount.innerText = post.likes;
    }
  });

  likeContainer.append(likeButton, likeCount);
  cardInteraction.append(openPostButton, likeContainer);
  postCard.append(userContainer, postTitle, postArticle, cardInteraction);

  return postCard;
}

export function renderModal(array) {
  const modal = document.querySelector('.modal__controller');
  const buttons = document.querySelectorAll('.interaction__container--button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const modalContent = createModal(button.dataset.postId, array);

      modal.innerHTML = '';

      modal.appendChild(modalContent);

      modal.showModal();

      closeModal();
    });
  });
}
