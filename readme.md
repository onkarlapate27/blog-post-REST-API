## About
This REST API helps to perform operations on a database of blogs. <br />
When you make a request to the REST API, you will specify an HTTP method and a path. In case of POST requests or request for specific entries in database, you also need to specify request headers and/or route parameters. The API will return the response status code, response headers, and a response body wherever applicable.

## Making a request and response received 

#### 1. Get all blog posts

REQUEST:- <br />
a. URL Path - "/api/blogs" <br />
b. Method - GET 

RESPONSE:-
a. If the request is successfully executed, an array of blog post objects (sorted by PostID) will be returned as a resonse with appropriate status code. <br />
b. If any error is encountered, error will be given with appropriate status code.

Refer to the image given below for more clarity 

#### 2. Create a blog post

REQUEST:- <br />
a. URL Path - "/api/blogs" <br />
b. Method - POST <br />
c. Request headers required:- blog title, blog content and blog category<br />
	

RESPONSE:- <br />
a. If the request is successfully executed, the blog will be saved to database and the a blog post object will be returned with a PostID included in it. <br />
b. If any error is encountered, error will be given with appropriate status code.

Refer to the image given below for more clarity


#### 3. Fetch all words starting with 'a' or 'A' in a blog post content with given PostId.  

a. URL Path - "/api/blogs/start-a/:PostID" <br />
b. Method - GET

RESPONSE:-
a. If the request is successfully executed, an array of words starting with 'a' or 'A' will be returned as a resonse with appropriate status code. <br />
b. If the PostID requested is invalid, requisite error will be raised. <br />
c. If any other error is encountered, error will be given with appropriate status code.

Refer to the image given below for more clarity


#### 4. Replace last 3 letters with '*' for all words starting with 'a' or 'A' in a blog post content with given PostId.  

a. URL Path - "/api/blogs/replace-a/:PostID" <br />
b. Method - PATCH

RESPONSE:- <br />
a. If the request is successfully executed, last 3 letters of words starting with 'a' or 'A' in blog post content will be replaced by '*' and the same will be updated in the database. <br />
b. If the PostID requested is invalid, requisite error will be raised. <br />
c. If any other error is encountered, error will be given with appropriate status code.

Refer to the image given below for more clarity





















