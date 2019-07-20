# Overview

When I first started to work on this project I started to work by trying to figure out which parts the main application needed to be broken down into.

I first began by working to split the main application into two components. One for the home page then one for the post detail page

This was then broken down further to get a seperate part for the Post Form and the common data functions. This would have then been broken down further to get the category component seperate but time began to run short so it was felt that it would be better to tidy the remainder of the functioning components.

# Offline First

In order to compensate for those users with low bandwith or those working offline I used local storage to store the posts and users information. I decided not to store the images directly as that could take a lot of space on smaller users potentially but caches could be used to store the data if needed for future iterations.

The data is stored in a sorted form to allow for easy use.  

# Initial versions

I initially had a version that on rendering an individual post would just fetch the single post (embedded with comments) and after that had finished resolving the promise, I would then go fetch the ``user`` from the corresponding ``userId`` field of the ``post``. This had performance issues in terms of time as both posts were done one after the other (as we needed to resolve the first to get the userId) and then took even longer to then go fetch individual users for each comment to get the ``photo_url`` for each commenting user. Therefore the decision was made to use more storage and store all users and posts and not rely on more bandwidth instead.  


# Tasks

1. Make the post feed render data from `https://api-yelbdjwpjh.now.sh/posts`. Posts should display in reverse chronological order by `createdAt`. Newline characters in the post `body` should render separate paragraph elements.
    1. The home page successfully rendered the list of posts by storing the posts and the user content in the state as well as localStorage.
    1. I chose to intially add the users to the posts request to store the user info (and photo_url) but then I changed it to store the comments instead as it was better to store users seperately and have the comments at hand so that the data was there immediately in the post detail page of task 3. 
    1. By using axios and using promises I was able to ensure that all the data needed was resolved on the page with helper mesages whilst the content was loading
1. Implement the input form so that it submits a new post to the JSON API. The post list should automatically update.
   (do not worry about user authentication for now)
   1.   I implemented the input form by creating helper functions to track the state and used axios to help with the post request to the form with the necessary json in the body content.
   1.   I needed to prevent the default behaviour of the form where it rerenders the whole page until I was finished and the new data was there so instead I reloaded the window once the post request was finished.
   1.   As no user data was provided it defaulted to the last added user which was id 4 in my case.
1. Make the post detail screen fetch the correct post with comments and render them both.
    1. By passing in the matching param  I was able to do pass the id and retrieve the information from our storage (or fetch the posts if it wasn't there).
    1. In a similar way to the part 1 I got each paragraph in its own element.
1. Using the `categories` property on the `post` resource. Populate the categories list with an aggregate of all the categories. This list should render a unique item for each category, and a total number of posts that have that category.
    1. As we had all the posts already in task 1. I just filtered on those with at least one category and then reduced on that with an object which by the end had a category for the key and the count of that category as the value which i then put in the HTML.
1. Can you make it so the data from api responses are locally stored so it doesn't need to be fetched every time you return to the home page or visit a detail page?
    1. As discussde above and in the comments, I used localStorage to store the data as needed for the posts and users
1. Can you implement the category links so they filter the posts? (you can use http://localhost:4000/posts?categories_like=science-fiction` to fetch the data by a specific category)
    1. I ran out of time to finish this part of the tasks but this could have been done by creating a function that is triggered when a category is clicked (and teh event allows us to see which category) and I can then just change the posts variable in our state to filter on that stored in localStorage (so we don't destroy any of our posts and can rely on them later if we change category).

# Trade Offs

1. One trade off discussed was in terms of storage vs bandwidth in terms of which parts to store locally and which to fetch but it was determined that images would be pulled but the api content themselves stored.

1. I created a seperate variable to refresh the page which gets updated. It is currently only changed once we add a new post but this could be done to automatically download every x minutes etc.

1. We currently download all users if and only if posts has changed. This may be done better by  checking the user of the new post and only downloading if the user isn't in there. THe tradeoff depends on how large the user database is in terms of searching ( which is O(nLogn) ) and bandwidth.

1. I would fix the div and css styling to make the row of categories rollover nicely when on smaller deices.

1. We need to update posts in our local storage. If we know we are the only one we could just add the post to the main posts array by pushing,. however in this case we can't as we may have other users piushing to the apis so we should update by calling posts.

1. We could use the cache storage to store images but could be large memory on smaller devices


# Future edits

I would add a user and category inputs to the form html and would use similar helper functions to the body and title to add the neccessary data for the project.

I would also use the delete paart of the CRUD API and add buttons to delete a post (which would trigger a fetch of new data). 

I would also add signup and authorising functionality to track which user posts.

A similar form could also be created for comments so that we could add comments to other posts.

I could have done better refactoring afterwards - helper functions to map and add tag when split on newline etc.

This is similar to the intended behaviour of libs/api as a starter of the intended progress. 