function loadPosts() {
  const postList = document.getElementById('post-list');
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  
  postList.innerHTML = posts.map(post => `
    <li>
      <a href="post.html?id=${post.id}">${post.title}</a>
    </li>
  `).join('');
}

document.getElementById('new-post-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (title && content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = { id: Date.now(), title, content };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    window.location.href = 'index.html';
  }
});

function loadPostDetails() {
  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get('id'), 10);
  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  const post = posts.find(p => p.id === postId);

  if (post) {
    document.getElementById('post-details').innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
    `;
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;
  } else {
    alert('Post not found');
    window.location.href = 'index.html';
  }
}

function toggleEditMode(showEdit) {
  document.getElementById('post-details').style.display = showEdit ? 'none' : 'block';
  document.getElementById('edit-form').style.display = showEdit ? 'block' : 'none';
  document.getElementById('edit-button').style.display = showEdit ? 'none' : 'inline-block';
}

function saveEditedPost() {
  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get('id'), 10);
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex !== -1) {
    posts[postIndex].title = document.getElementById('edit-title').value.trim();
    posts[postIndex].content = document.getElementById('edit-content').value.trim();
    localStorage.setItem('posts', JSON.stringify(posts));

    loadPostDetails();
    toggleEditMode(false);
  }
}

function deletePost() {
  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get('id'), 10);
  let posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts = posts.filter(post => post.id !== postId);

  localStorage.setItem('posts', JSON.stringify(posts));
  window.location.href = 'index.html';
}

document.getElementById('edit-button')?.addEventListener('click', () => toggleEditMode(true));
document.getElementById('cancel-edit')?.addEventListener('click', () => toggleEditMode(false));
document.getElementById('edit-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  saveEditedPost();
});
document.getElementById('delete-button')?.addEventListener('click', function() {
  if (confirm("Are you sure you want to delete this post?")) {
    deletePost();
  }
});

if (document.getElementById('post-list')) {
  loadPosts();
}

if (document.getElementById('post-details')) {
  loadPostDetails();
}



