# Environment and concepts about Node JS - material from Rockseat's bootcamp.

This node js project is a REST API that register user names.

- GET http://localhost:3000/users - list all users
- GET http://localhost:3000/users/0 - get a user
- POST http://localhost:3000/users - registers a user - in request body: { "name": "Jhon" }
- PUT http://localhost:3000/users/0 - edit a user name - in request body: { "name": "Jhon" }
- DELETE http://localhost:3000/users/0 - delete a user

# Running it

```
yarn && yarn dev
```
