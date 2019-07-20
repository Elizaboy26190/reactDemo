# Background

A designer has created a starter react app with static markup and implemented the CSS.
You have been tasked to make the UI interactions work and make the app render data from an existing REST API.

The app consists of two screens.

- A homepage that lists posts and has a form to create new posts.
- A detail page that shows a single post and its associated comments.

This challenge is designed to test your knowledge of:

- Authoring react components
- basic client side routing
- interacting with a REST JSON API
- rendering and transforming data
- basic forms
- Caching data client side so it can be used across multiple components

## The starting application

Using [create-react-app](https://github.com/facebookincubator/create-react-app),
the designer has already stubbed out and styled a static react application.
They made a component for each of the two screens and connected them with react-router.
The code for these is located in `src/App.js`.

# Guidelines

- Feel free to add or update any dependencies you like.
- Feel free to add new files/directories as you see fit.
- Don't worry about modifying the provided CSS.
- You may work on this project in codesandbox (and submit a link to your completed solution) or you may export the project and work on the solutions locally (and submit your completed code via email).
- Err on the side of adding more comments than usual, explaining your rationale and any trade-offs considered along the way.
- If you abandon an early solution in favor of one you consider better, feel free to include the earlier version and leave a comment explaining the relative benefits of the newer version.
- If you get close to running out of time, add some comments to describe what you would do differently if you had more time.
- 2 hours is the recommended time for this task (just let us know if you end up spending more/less than this).
- There's a lot here - certainly enough to spend more than 2 hours on - it's up to you to decide how you want to allocate the time you spend on this. For example, if you would prefer to do fewer of the tasks and optimize on overall quality, that's completely reasonable. Don't feel that the aim is to get through all of the tasks at any cost.
- The goal is to make appreciable progress through these tasks, while demonstrating a breadth of skills and consideration of architectural tradeoffs.

# Tasks

1. Make the post feed render data from `https://api-yelbdjwpjh.now.sh/posts`. Posts should display in reverse chronological order by `createdAt`. Newline characters in the post `body` should render separate paragraph elements.
1. Implement the input form so that it submits a new post to the JSON API. The post list should automatically update.
   (do not worry about user authentication for now)
1. Make the post detail screen fetch the correct post with comments and render them both.
1. Using the `categories` property on the `post` resource. Populate the categories list with an aggregate of all the categories. This list should render a unique item for each category, and a total number of posts that have that category.
1. Can you make it so the data from api responses are locally stored so it doesn't need to be fetched every time you return to the home page or visit a detail page?
1. Can you implement the category links so they filter the posts? (you can use http://localhost:4000/posts?categories_like=science-fiction` to fetch the data by a specific category)

# JSON API

The API lives at [https://api-yelbdjwpjh.now.sh/](https://api-yelbdjwpjh.now.sh/)

See [json-server](https://github.com/typicode/json-server#routes) for the full details of the
API's capabilities.

The three resources are accessible at:

- https://api-yelbdjwpjh.now.sh/posts
- https://api-yelbdjwpjh.now.sh/comments
- https://api-yelbdjwpjh.now.sh/users

Each resource supports the full list of RESTful actions.

- Fetch post with ID 1: `https://api-yelbdjwpjh.now.sh/post/1`
- Fetch all comments for post with ID 1: `https://api-yelbdjwpjh.now.sh/comments?postId=1`

## Posting data to the server

request

```
curl -d '{"title":"Some title", "body":"Some body"}' -H "Content-Type: application/json" -X POST https://api-yelbdjwpjh.now.sh/posts
```

response

```
{
  "title": "Some title",
  "body": "Some body",
  "userId": 4,
  "createdAt": "2017-09-11T16:28:12.025Z",
  "id": 5
}
```

The mock server doesn't have any validation so it will take whatever data you post to it.

## Embedding relationships

It also has the ability to embed relationships in the resources:

- use `https://api-yelbdjwpjh.now.sh/posts?_expand=user` To include users in the posts resource
- use `https://api-yelbdjwpjh.now.sh/posts?_embed=comments` To include comments in the posts resource

For full capabilites of the API server see https://github.com/typicode/json-server#routes

Points:-

Trade off if we save it stored and search manually for all of it / keep two arrays / stored unsorted and sort each time

automatically change users if and only if posts has changed.

we chose to trigger release required currenlty only if new post is created, but could be done to automatically download every x minutes etc.

would fix css styling to make categories loop when on smaller deices.

            // need to update posts in our local storage. If we know we are the only one we could just add the post to the main posts array by pushing,. however in this case we can't as we may have other users piushing to the apis so we should update by calling posts.
could use the cache storage to store images but could be large size on smaller devices