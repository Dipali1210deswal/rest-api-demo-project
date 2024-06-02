document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts');
    const loadingIndicator = document.getElementById('loading');
    const postDetailsContainer = document.getElementById('post-details');
    const postContent = document.getElementById('post-content');
    const commentsContainer = document.getElementById('comments');
    const backButton = document.getElementById('back-button');

    const API_URL = 'https://jsonplaceholder.typicode.com';

    const users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz"
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv"
        },
        {
            "id": 3,
            "name": "Clementine Bauch",
            "username": "Samantha",
            "email": "Nathan@yesenia.net"
        },
        {
            "id": 4,
            "name": "Patricia Lebsack",
            "username": "Karianne",
            "email": "Julianne.OConner@kory.org"
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "username": "Kamren",
            "email": "Lucio_Hettinger@annie.ca"
        },
        {
            "id": 6,
            "name": "Mrs. Dennis Schulist",
            "username": "Leopoldo_Corkery",
            "email": "Karley_Dach@jasper.info"
        },
        {
            "id": 7,
            "name": "Kurtis Weissnat",
            "username": "Elwyn.Skiles",
            "email": "Telly.Hoeger@billy.biz"
        },
        {
            "id": 8,
            "name": "Nicholas Runolfsdottir V",
            "username": "Maxime_Nienow",
            "email": "Sherwood@rosamond.me"
        },
        {
            "id": 9,
            "name": "Glenna Reichert",
            "username": "Delphine",
            "email": "Chaim_McDermott@dana.io"
        },
        {
            "id": 10,
            "name": "Clementina DuBuque",
            "username": "Moriah.Stanton",
            "email": "Rey.Padberg@karina.biz"
        }
    ];

    async function fetchPosts() {
        try {
            const postsResponse = await fetch(`${API_URL}/posts`);
            const posts = await postsResponse.json();

            postsContainer.innerHTML = '';
            posts.forEach(post => {
                const user = users.find(user => user.id === post.userId);
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <p><strong>User:</strong> ${user.name} (${user.email})</p>
                `;
                postElement.addEventListener('click', () => showPostDetails(post.id));
                postsContainer.appendChild(postElement);
            });

            loadingIndicator.classList.add('hidden');
        } catch (error) {
            console.error('Error fetching posts:', error);
            loadingIndicator.textContent = 'Failed to load posts.';
        }
    }

    async function showPostDetails(postId) {
        try {
            const [postResponse, commentsResponse] = await Promise.all([
                fetch(`${API_URL}/posts/${postId}`),
                fetch(`${API_URL}/comments?postId=${postId}`)
            ]);

            const post = await postResponse.json();
            const comments = await commentsResponse.json();

            postContent.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;

            commentsContainer.innerHTML = '';
            comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.innerHTML = `
                    <p><strong>${comment.name}</strong> (${comment.email})</p>
                    <p>${comment.body}</p>
                `;
                commentsContainer.appendChild(commentElement);
            });

            postsContainer.classList.add('hidden');
            postDetailsContainer.classList.remove('hidden');
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    }

    backButton.addEventListener('click', () => {
        postDetailsContainer.classList.add('hidden');
        postsContainer.classList.remove('hidden');
    });

    fetchPosts();
});
