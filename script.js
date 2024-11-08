document.addEventListener('DOMContentLoaded', () => {

  if (document.getElementById('blog-posts-list')) {

    const blogPostsList = document.getElementById('blog-posts-list');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (posts.length === 0) {
      blogPostsList.innerHTML = '<li>No posts available. Please add a new post!</li>';
    } else {

      posts.forEach((post, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content.substring(0, 100)}...</p> <!-- Show the first 100 characters of content -->
          <a href="post.html?id=${index}">Read More</a> | 
          <button onclick="deletePost(${index})">Delete</button>
        `;
        blogPostsList.appendChild(li);
      });
    }
  }

  if (document.getElementById('new-post-form')) {

    const form = document.getElementById('new-post-form');
    
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;

      if (title && content) {
        const newPost = { title, content };
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        window.location.href = 'index.html';
      } else {
        alert('Please fill out both the title and content fields.');
      }
    });
  }

  if (document.getElementById('post-details')) {
    const postId = new URLSearchParams(window.location.search).get('id');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[postId];

    if (post) {

      const postDetails = document.getElementById('post-details');
      postDetails.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      `;

      const editButton = document.getElementById('edit-button');
      const editForm = document.getElementById('edit-post-form');
      editButton.addEventListener('click', () => {
        document.getElementById('edit-title').value = post.title;
        document.getElementById('edit-content').value = post.content;
        editForm.style.display = 'block';
      });

      editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const updatedPost = {
          title: document.getElementById('edit-title').value,
          content: document.getElementById('edit-content').value
        };
        posts[postId] = updatedPost;
        localStorage.setItem('posts', JSON.stringify(posts));
        window.location.href = 'index.html';
      });

      const deleteButton = document.getElementById('delete-button');
      deleteButton.addEventListener('click', () => {
        posts.splice(postId, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        window.location.href = 'index.html';
      });
    } else {
      alert('Post not found!');
      window.location.href = 'index.html';
    }
  }
});

function deletePost(index) {
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  location.reload();
}

