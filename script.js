// const listElement = document.querySelector('.posts');
// const postTemplate = document.getElementById('single-post');

// const xhr = new XMLHttpRequest();

// xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

// xhr.responseType = 'json';

// xhr.onload = function() {
//   // const listOfPosts = JSON.parse(xhr.response);
//   const listOfPosts = xhr.response;
//   for (const post of listOfPosts) {
//     const postEl = document.importNode(postTemplate.content, true);
//     postEl.querySelector('h2').textContent = post.title.toUpperCase();
//     postEl.querySelector('p').textContent = post.body;
//     listElement.append(postEl);
//   }
// };
// xhr.send();



const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data) {
    // const promise = new Promise((resolve, reject) => {
    // const xhr = new XMLHttpRequest();
    // xhr.setRequestHeader('Content-Type', 'application/json');
  
    //   xhr.open(method, url);
  
    //   xhr.responseType = 'json';
  
    //   xhr.onload = function() {
    //     if (xhr.status >= 200 && xhr.status < 300) {
    //       resolve(xhr.response);
    //     } else {
    // xhr.response;
    //       reject(new Error('Something went wrong!'));
    //     }
    //     // const listOfPosts = JSON.parse(xhr.response);
    //   };
  
    //   xhr.onerror = function() {
    //     reject(new Error('Failed to send request!'));
    //   };
  
    //   xhr.send(JSON.stringify(data));
    // });
  
    // return promise;
    return fetch(url, {
      method: method,
    //   Using FormData
    //   body: data,
    //   Using Json data
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          return response.json().then(errData => {
            console.log(errData);
            throw new Error('Something went wrong - server-side.');
          });
        }
      })
      .catch(error => {
        console.log(error);
        throw new Error('Something went wrong!');
      });
  }
  
  async function fetchPosts() {
    try {
      const responseData = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //   await sendHttpRequest(
    //     'GET',
    //     'https://jsonplaceholder.typicode.com/posts'
    //   );
    console.log(responseData)
      const listOfPosts = responseData.data;
      for (const post of listOfPosts) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        postEl.querySelector('li').id = post.id;
        listElement.append(postEl);
      }
    } catch (error) {
      alert(error.message);
    }
  }
  

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId
  };

  const fd = new FormData();
  fd.append('title', title);
  fd.append('body', content);
  fd.append('userId', userId);

  const response = axios.post('https://jsonplaceholder.typicode.com/posts',fd)
  console.log(response)
//   sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', fd);
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;

  createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', event => {
    if(event.target.tagName === 'BUTTON'){
        const postId = event.target.closest('li').id;
        console.log(postId)
       const response = axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        // sendHttpRequest('DELETE',`https://jsonplaceholder.typicode.com/posts/${postId}`)
        console.log(response)
    }
})