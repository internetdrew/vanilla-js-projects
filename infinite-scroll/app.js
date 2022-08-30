'use strict';

const postContainer = document.getElementById('posts-container'),
  loader = document.getElementById('loader'),
  filter = document.getElementById('filter');

let limit = 5;
let page = 1;

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

const showLoading = function () {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
};

const showMorePosts = function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
};

window.addEventListener('load', showPosts);
window.addEventListener('scroll', showMorePosts);
