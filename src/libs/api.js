import 'isomorphic-fetch';

const baseUrl = `https://api-yelbdjwpjh.now.sh`;

const api = {
    site: {
        async getInfo() {
            const response = await fetch(baseUrl);
            const data = await response.json();
            return data;
        },
    },
    posts: {
        async getList() {
            const response = await fetch(`${baseUrl}/posts`);
            const data = await response.json();
            return data;
        },
        async getSingle(id) {
            const response = await fetch(`${baseUrl}/posts/${id}`);
            const data = await response.json();
            return data;
        },
    },
};


export default api;