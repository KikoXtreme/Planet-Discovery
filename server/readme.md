# REST-api for Angular project

## Getting started
Let's make our first API request to the REST-api!

In the example below, we're trying to get information about the REST-api:

```https://localhost:3000/api/test```

Here is the response we get:

```
{
    "name": "rest-api",
    "version": "1.0.0",
    "description": "server: REST-api for back-end for Angular project",
    "main": "index.js",
}
```

If your response looks slightly different don't panic. This is probably because more data has been added to the API since I made this documentation.

## Base URL
The Base URL is the root URL for all of the API, if you ever make a request to the API and you get back a 404 NOT FOUND response then check the Base URL first.

The Base URL for the API is:

```https://localhost:3000/api```

The documentation below assumes you are prepending the Base URL to the endpoints in order to make requests.

## Authentication
This API isn't open API. Authentication is required to store and get data. You can use the connected REACT-app to make registration and sign in. This also means that I've limited what you can do. If you find a mistake, then just write an issue.

# Endpoints: Users

* ```/users/register``` -- signing up;
* ```/users/login``` -- signing in;
* ```/users/logout``` -- logging out;

## Register User
Signs up user and returns the registered data as json.

### URL --> ```/users/register```

### Method --> ```POST```

### Body -->

```
{
    "name":"John Doe",
    "email":"john@email.com",
    "username":"Johny",
    "password":"12345",
    "repass":"12345"
}
```

Required:

```email``` : [string] -- The email of the person is required and must be unique;

```username``` : [string] -- The username of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

```password``` : [string] -- The password of the person is required and must be unique, also there is a minimum length of 5 chars, allowed are latin letters and numbers;

Not Required

```country``` : [string] -- Optional;

### Success Response:

Code: 200

Content: 
``` 
{
    "planets": [],
    "posts": [],
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 409 CONFLICT

Content: 
```
{
    "message": "This email/username is already registered!"
}
```

## Login User
Signs in user and returns the registered data as json.

### URL --> ```/users/login```

### Method --> ```POST```

### Body -->

```
{
    "username":"Johny",
    "password":"12345"
}
```

Required:

```username``` : [string] -- The username of the person 

```password``` : [string] -- The password of the person 

### Success Response:

Code: 200

Content: 
``` 
{
    "planets": ["5f85c51996b5601b2406e5b7"],
    "posts": ["5f86bdcde012743fe4f5b324"],
    "_id": "5f1875690916010017964978",
    "name": "John Doe",
    "email": "john@email.com",
    "username": "Johny",
    "created_at": "2020-10-14T08:04:12.196Z",
    "updatedAt": "2020-10-14T08:58:53.589Z"
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{ 
    "message": "Wrong username or password"
}
```

## Logout User
Logout user.

### URL --> ```/users/logout```

### Method --> ```POST```

### Success Response:

Code: 401 Unauthorized

Content: 
``` 
{ 
    "message": "Logged out!"
}
```

# Endpoints: Planets

* ```/planets```
* ```/planets/:planetId```

## Get Planets
Returns all planets as json.

### URL --> ```/planets```

### Method --> ```GET```

### Success Response:

Code: 200

Content: 
``` 
[
    {
        "subscribers": ["5f8580d25d1da62568dd38fd"],
        "posts": ["5f858dd2d895ad23602db9d5"],
        "_id": "5f858dd2d895ad23602db9d4",
        "planetsName": "Some Planets",
        "userId": "5f8580d25d1da62568dd38fd",
        "created_at": "2020-10-13T11:21:54.863Z",
        "updatedAt": "2020-10-13T11:21:54.898Z",
        "__v": 0
    }
]
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Post Planet
Creates new Planet with the first post of the author and returns the planet as json.

### URL --> ```/planets```

### Method --> ```POST```

### Body -->

```
{
    "planetName": "Some Planet Title",
    "postText": "Some Post text"
}
```

Required:

```planetName``` : [string] -- The Title of your new Planet, which you want to create
```postText``` : [string] -- The text of your post. This post will be append as first comment on your Planet.

### Success Response:

Code: 200

Content: 
``` 
{
    "subscribers": ["5f86c1f0a112c130e89964af"],
    "posts": ["5f86c38abfa44331a0ff0094"],
    "_id": "5f86c38abfa44331a0ff0093",
    "planetName": "Some Planet Title",
    "userId": "5f86c1f0a112c130e89964af",
    "created_at": "2020-10-14T09:23:22.102Z",
    "updatedAt": "2020-10-14T09:23:22.114Z",
    "__v": 0
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Create Post
Creates new Post of the author and returns the planet as json.

### URL --> ```/planets/:planetId```

### Method --> ```POST```

### Body -->

```
{
    "postText": "Some Post text"
}
```

### Success Response:

Code: 200

Content: 
``` 
{
"subscribers": ["5f8580d25d1da62568dd38fd"],
"posts": [
    "5f85ad8f1141b13a04a9139c",
    "5f85b2501141b13a04a9139d"
],
"_id": "5f858dd2d895ad23602db9d4",
"planetName": "Some Planet",
"userId": "5f8580d25d1da62568dd38fd",
"created_at": "2020-10-13T11:21:54.863Z",
"updatedAt": "2020-10-13T13:57:36.466Z",
"__v": 0
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

# Endpoints: Posts

* ```/planets/:planetId/posts/:postId```

## Edit Post
Edit Post if the user is the author of the post and returns the changed post.

### URL --> ```/planets/:planetId/posts/:postId```

### Method --> ```PUT```

### Body -->

```
{
    "postText": "Changed text"
}
```

### Success Response:

Code: 200

Content: 
``` 
{
    "likes": [],
    "_id": "5f86c3fcbfa44331a0ff0095",
    "text": "Changed text",
    "userId": "5f86c1f0a112c130e89964af",
    "planetId": "5f85c51996b5601b2406e5b7",
    "created_at": "2020-10-14T09:25:16.203Z",
    "updatedAt": "2020-10-14T09:31:45.021Z",
    "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```

## Delete Post
Deletes Post if the user is the author of the post and returns the deleted post.

### URL --> ```/planets/:planetId/posts/:postId```

### Method --> ```DELETE```

### Success Response:

Code: 200

Content: 
``` 
{
    "likes": [],
    "_id": "5f86c3fcbfa44331a0ff0095",
    "text": "Changed text",
    "userId": "5f86c1f0a112c130e89964af",
    "planetId": "5f85c51996b5601b2406e5b7",
    "created_at": "2020-10-14T09:25:16.203Z",
    "updatedAt": "2020-10-14T09:33:56.595Z",
    "__v": 0
}
```

### Error Response:

Code: 401 Unauthorized

Content: 
```
{
    message: "Not allowed!"
}
```

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```
## Like Post
Adds like to the post.

### URL --> ```/likes/:postId```

### Method --> ```PUT```

### Success Response:

Code: 200

Content: 
``` 
{
    message: "Liked successful!"
}
```

### Error Response:

Code: 500 Internal Server Error

Content: 
```
{
    message: "Something went wrong!"
}
```