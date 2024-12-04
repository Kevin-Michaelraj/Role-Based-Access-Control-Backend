# Role-Based-Access-Control-Backend
This simple project implements role-based access control with token authentication, allowing users to register with roles (admin, moderator, user) and access resources based on their role, ensuring secure authentication and authorization.

# Features
User Registration: Users can register with a username, password, and role (admin, moderator, user). The password is securely saved as a hash using bcrypt.
Login & Token Generation: After logging in, users receive a JWT token for authenticating future requests.
Role-Based Access: Different roles (admin, moderator, user) have access to different resources.
Secure Authentication: Uses JWT for secure token-based authentication.
Password Hashing: The user's password is hashed before being saved to the database to enhance security.

# Technologies Used
* Node.js
* Express
* MongoDB (with Mongoose for schema)
* JWT (JSON Web Token)
* bcrypt (for password hashing)
* CORS (Cross-Origin Resource Sharing)

# Setup
  * Prerequisites:
      Node.js installed
      MongoDB running locally or a cloud MongoDB service
  * Install dependency:
      npm install express cors bcrypt jsonwebtoken mongoose
  * Create a .env file to store sensitive environment variables:
      ACCESS_TOKEN_SECRET=your-secret-key
  * Add devStart to script:
      "scripts": {
               "devStart": "node server.js"
                }
  * run node:
        npm run devStart
  * The server will start and listen on port 3115.

# Functions and endpoints
     POST /register: Register a new user. password is hashed and stored in database.
     POST /login: Login with username and password to receive a JWT token.
     POST /logout: Logout the user. Since JWT is stateless, it’s a simple response message, but you need to clear the token on the client side.
     GET /api/users/admin: Accessible only by admins. Returns all user data.
     GET /api/users/moderator: Accessible by both admins and moderators.
     GET /api/users/user: Accessible by admin, moderator, and regular users. Returns the logged-in user's data.
# Json format
     POST /register
         {
         "username": "user12",
         "password": "password",
         "role": "admin"
         }
      POST /login
         {
         "username": "user12",
         "password": "password",
         }
      GET /api/users/admin
      Authorization: Bearer JWT_Token

      GET /api/users/moderator
      Authorization: Bearer JWT_Token

      GET /api/users/user
      Authorization: Bearer JWT_Token
       
# Testing
      Use POSTMAN OR REST CLIENT (VISUAL STUDIO CODE)
# Problems:
     If you receive a 403 error, it means you do not have the proper role for that resource.
     Ensure your .env file contains a valid ACCESS_TOKEN_SECRET for token signing.



              
