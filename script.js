const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    console.log("res", res)
    const data = await res.json();
    console.log("data", data)
    
    return data;
}

async function showPosts() {
    const posts = await getPosts();
    posts.forEach(p => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${p.id}</div>
            <div class="post-info">
            <h2 class="post-title">${p.title}</h2>
            <p class="post-body">${p.body}</p>
            </div>
        `;

        postsContainer.appendChild(postEl);
    });
}

function showLoading() {
    loading.classList.add('show');

    setTimeout(() =>  {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts();
        }, 300)
    }, 1000);

}

window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight} = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight)
    {
        showLoading();
    }
});

function filterPosts(e) {
    const text = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(p => {
        const title = p.querySelector('.post-title').innerText.toUpperCase();
        const body = p.querySelector('.post-body').innerText.toUpperCase();
        if (title.indexOf(text) > -1 || body.indexOf(text) > -1) {
            p.style.display = 'flex';
        } else {
            p.style.display = 'none';
        }
    });
} 

showPosts();

filter.addEventListener('input', filterPosts);
// getPosts();