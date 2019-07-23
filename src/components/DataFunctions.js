// Default page to create access to posts from the appUrl endpoint
import axios from "axios";

// Link to default URL for requests
export const appUrl = "https://api-yelbdjwpjh.now.sh";

// Helper function to allow us to download new data
// It checks to see if we have the reloadRequired variable set to true or if we have not got the posts stored already.
// We allow both the users and post to download in parallel and not rely on the other

function sortData(array) {
    const sortedData = array.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
    // Sort comments too
    sortedData.map(a => {

        a.comments = a.comments.sort(function (key1, key2) {
            key1 = key1.id;
            key2 = key2.id;
            if (key1 < key2) return 1;
            if (key1 > key2) return -1;
            return 0;
        })
        return a;
    })
    return sortedData;
}


function returnCategories(array) {
    const allCategories = [];

    array.filter(a => {
        return a.categories.length !== 0
    })
        .forEach(post => {
            allCategories.push(...post.categories);
        });
    // We can now work on this list and create an object with a key corresponding to the category and the count for each category e.g. {history:1,romance:2}
    const reducedData = allCategories.reduce((categoryJson, category) => {
        // if we have not seen this category before add it to our object.
        if (!categoryJson[category]) {
            categoryJson[category] = 0;
        }
        // increment the count for our object
        categoryJson[category]++;
        return categoryJson;
    }, {});
    return reducedData;
}

// function resolve(userPromise,postPromise) {
//     return
// }

async function resolveUsersandPosts(context) {
    const PostPromise = axios.get(`${appUrl}/posts/?_embed=comments`).then(response => {
        // Sort the posts in reverse chronological order
        return response.data;

    });

    const UserPromise = axios.get(`${appUrl}/users`).then((response) => {
        return response.data;
    });
    await Promise.all([UserPromise, PostPromise]).then(
        function (values) {
            const sortedData = sortData(values[1]);
            const userData = values[0];
            context.setState({posts: sortedData});
            context.setState({filteredPosts: sortedData});
            context.setState({users: userData});

            // We need to filter and then push the spliced results into the array
            const reducedData = returnCategories(context.state.posts);
            // Update our local state and localStorage to reflect the new data and sort so the most common categories appear first
            context.setState({categories: reducedData});

            // localStorage setup
            localStorage.setItem('categories', JSON.stringify(reducedData));
            localStorage.setItem('posts', JSON.stringify(sortedData));
            localStorage.setItem('users', JSON.stringify(userData));


        });
}

export function fetchNewData(context) {
    if (localStorage.getItem('reloadRequired') === 'true' || !localStorage.getItem('posts')) {

        resolveUsersandPosts(context);
        localStorage.setItem('reloadRequired', 'false')

        // console
    } else {
        // we already have it saved so don't need to reload. We should load from localStorage instead for our posts, users and categories
        context.setState({posts: JSON.parse(localStorage.getItem('posts'))});
        context.setState({filteredPosts: JSON.parse(localStorage.getItem('posts'))});
        context.setState({users: JSON.parse(localStorage.getItem('users'))});
        context.setState({categories: JSON.parse(localStorage.getItem('categories'))});

    }
}