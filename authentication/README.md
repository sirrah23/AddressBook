# Authentication

## Introduction

This file contains the code for a **microservice** which oversees the flow of authentication tokens.

## Token type

The tokens managed by this service are [JSON Web Tokens](https://jwt.io/).

## Supported actions/endpoints

### Create

This action creates a new JWT if a valid set of credentials is provided.

* Endpoint: 
  * /getAuthToken
* Input: 
  * Username
  * Password
* Output
  * Error Flag
  * Error Message
  * JWT

### Validate

This action validates that the given JWT was both generated by this service and returns its associated content.

* Endpoint: 
  * /validateAuthToken
* Input: 
  * JWT
* Output
  * Error Flag
  * Error Message
  * JWT contents (decrypted)