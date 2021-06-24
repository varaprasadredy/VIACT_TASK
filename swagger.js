export default {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "User API Documentation",
    "description": "User API Information",
  },
  "host": `localhost:${process.env.API_PORT}`,
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    '/auth/login': {
      "post": {
        "tags": [
          "Authentication"
        ],
        "summary": "User Login",
        "description": "User Login",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "schema": {
              "properties": {
                "email": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Login Successfully",
          }
        }
      },
    },
    '/auth/register': {
      "post": {
        "tags": [
          "User"
        ],
        "summary": "User Sign up",
        "description": "Create new user in User table",
        "parameters": [
          {
            "name": "user",
            "in": "body",
            "description": "User that we want to create",
            "schema": {
              "properties": {
                "name": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                },
                "password": {
                  "type": "string"
                }
              }
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New user is created",
          }
        }
      }
    },
  }
}