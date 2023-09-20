import { users, posts, suggestUsers } from './database.js';

import {
  renderPublisherUserCard,
  renderSuggestionsList,
  renderPostsList,
} from './render.js';

renderPublisherUserCard(users);
renderSuggestionsList(suggestUsers);
renderPostsList(posts);

import { publishPost } from './publish.js';
publishPost(posts);
