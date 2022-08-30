'use strict';

const postContainer = document.getElementById('posts-container'),
  loading = document.getElementById('loader'),
  filter = document.getElementById('filter');

let limit = 3;
let page = 1;

const removeChildElsFrom = function (parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

const getPosts = async function () {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  if (!res.ok) throw new Error('Trouble fetching posts from API');

  const data = await res.json();
  return data;
};

const showPosts = async function () {
  const posts = await getPosts();

  removeChildElsFrom(postContainer);

  posts
    .map(post => {
      const html = `
      <div class="post">
         <div class="number">${post.id}</div>
         <div class="post-info">
           <h2 class="post-title">${post.title}</h2>
           <p class="post-body">
            ${post.body}
           </p>
         </div>
      </div>
   `;

      postContainer.insertAdjacentHTML('beforeend', html);
    })
    .join();
};

showPosts();
