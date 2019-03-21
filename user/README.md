# User

## Introduction

This folder contains the code for a **service** which oversees the management of user data.

## Supported actions/endpoints

### Register

This action adds a new user to the system.

* Endpoint:
  * /register
* Input:
  * Username
  * Password
  * Email
* Output
  * Error Flag
  * Error Message
  * User
    * User ID
    * Username
    * Email

### Validate

This action validates a given set of credentials i.e. (username, password).

* Endpoint:
  * /validate
* Input:
  * Username
  * Password
* Output
  * Error
  * Error Message
  * User
    * Found flag (a valid user was found for the given credentials)
    * User ID
    * Username

## How to run this service
From this directory run the **run.sh** script.

## How to run the tests
From this directory run the **test.sh** script.
