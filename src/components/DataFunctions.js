// Default page to create access to posts from the appUrl endpoint
import axios from "axios";

// Link to default URL for requests
export const appUrl = "https://api-yelbdjwpjh.now.sh";

// Helper function to allow us to download new data
// It checks to see if we have the reloadRequired variable set to true or if we have not got the posts stored already.
// We allow both the users and post to download in parallel and not rely on the other
export function fetchNewData(currentState) {

    //check if reload is required
    if (localStorage.getItem('reloadRequired') === 'true' || !localStorage.getItem('posts')) {

        // Need to fetch the posts so download the posts with the comments embedded
        axios.get(`${appUrl}/posts/?_embed=comments`)
            .then(res => {
                // Sort the posts in reverse chronological order
                const sortedData = res.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
                // Sort comments too
                sortedData.map(a=> {

                    a.comments = a.comments.sort(function(key1, key2){
                        key1 = key1.id;
                        key2 = key2.id;
                        if(key1 < key2) return 1;
                        if(key1 > key2) return -1;
                        return 0;
                    })
                    return a;
                })
                // Update our local state to store the new data
                console.log(currentState.state.posts);

                // Update our local storage to allow for offline use
                localStorage.setItem('posts', JSON.stringify(sortedData))
            }).then(res => {
            currentState.setState({posts: JSON.parse(localStorage.getItem('posts'))});
            currentState.setState({filteredposts: JSON.parse(localStorage.getItem('posts'))});
console.log("state =",currentState.state.posts);
            // Now need to get all the categories
            // The array to store the list of categories (including duplicates) from which we will calculate counts.
            const allCategories = [];
            // We need to filter and then push the spliced results into the array
            currentState.state.posts
                .filter(a => {
                    console.log(a);
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
            // Update our local state and localStorage to reflect the new data and sort so the most common categories appear first
            currentState.setState({categories: reducedData});
            localStorage.setItem('categories', JSON.stringify(reducedData))
        });

        // We also need to update our users as for the posts
        axios.get('https://api-yelbdjwpjh.now.sh/users')
            .then(res => {
                // Save the results of the data so that we can use them in localStorage and our state
                currentState.setState({users: res.data});
                localStorage.setItem('users', JSON.stringify(res.data))
            });
        // We have now done our reload so don't want to do it on subsequent reloads until needed
        localStorage.setItem('reloadRequired', false);
    } else {
        // we already have it saved so don't need to reload. We should load from localStorage instead for our posts, users and categories
        currentState.setState({posts: JSON.parse(localStorage.getItem('posts'))});
        currentState.setState({users: JSON.parse(localStorage.getItem('users'))});
        currentState.setState({categories: JSON.parse(localStorage.getItem('categories'))});
    }
}