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
        axios.get('https://api-yelbdjwpjh.now.sh/posts/?_embed=comments')
            .then(res => {
                // Sort the posts in reverse chronological order
                const new_res_data = res.data.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
                // Update our local state to store the new data
                currentState.setState({posts: new_res_data});
                // Update our local storage to allow for offline use
                localStorage.setItem('posts', JSON.stringify(new_res_data))
            }).then(res => {

            // Now need to get all the categories
            // The array to store the list of categories (including duplicates) from which we will calculate counts.
            const all_categories = [];
            // We need to filter and then push the spliced results into the array
            currentState.state.posts
                .filter(a => (a.categories.length !== 0))
                .forEach(post => {
                    all_categories.push(...post.categories);
                });
            // We can now work on this list and create an object with a key corresponding to the category and the count for each category e.g. {history:1,romance:2}
            const reduced_data = all_categories.reduce((all_categories, category) => {
                // if we have not seen this category before add it to our object.
                if (!all_categories[category]) {
                    all_categories[category] = 0;
                }
                // increment the count for our object
                all_categories[category]++;
                return all_categories;
            }, {});
            // Update our local state and localStorage to reflect the new data and sort so the most common categories appear first
            currentState.setState({categories: reduced_data});
            localStorage.setItem('categories', JSON.stringify(reduced_data))
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