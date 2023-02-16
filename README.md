# Budget-Application
Budget Application: Project 2
<!-- Name????? -->

# User Story

This application will allow a user to create a profile describing their income and expenses. The user will be able to set budget goals for themselves and view their progress. 

- Login/Create account (Profile)
- Profile data:
    - expenses (goals) (+constant ie.rent)(subscription)

    (connect account or input manually?)
    income, debt, expenses, bill due dates (with alerts), subscriptions

- progress (monthly)
    - charts (d3)

- budget goals:
    - Savings
    - Transportation
    - House payments
    - Personal (entertainment, clothing, misc)
    - Food

# npm packages
- Express.js
- Async
- YNAB library (new)


# Tasks
- Node.js and Express.js * Deorren
- Handlebars.js * Karinne & Adena
- MySQL and the Sequelize ORM for the database * Rima
- data modeling * Rima
- GET and POST routes (update/put) * Karinne
- Authentication (express-session and cookies) * Deorren
- Application appearance (front-end) * Adena
- Heroku * Karinne & Deorren

Adena To-Do's
- Get the Add Goals working
- D3 Chart
- Functional & attractive CSS (on different sized screens)


# Note-Taker
Express.js Challenge: Note Taker

## Description

This application can be used to write, save, and delete notes. This application uses an Express.js back end and will save and retrieve note data from a JSON file.

This application has a db.json file on the back end that is used to store and retrieve notes using the fs module. Each note has a unique id when it's saved, using the uniqid npm package.

This application has a delete request functionality. All the notes are read from the db.json file, the note with the given id property is removed, and the notes are rewritten to the db.json file.

### User Story

```
AS A small business owner
I WANT to be able to write and save notes
SO THAT I can organize my thoughts and keep track of tasks I need to complete
```

### Acceptance Criteria

```
GIVEN a note-taking application
WHEN I open the Note Taker
THEN I am presented with a landing page with a link to a notes page
WHEN I click on the link to the notes page
THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
WHEN I enter a new note title and the note’s text
THEN a Save icon appears in the navigation at the top of the page
WHEN I click on the Save icon
THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
WHEN I click on an existing note in the list in the left-hand column
THEN that note appears in the right-hand column
WHEN I click on the Write icon in the navigation at the top of the page
THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column
```

## Table of Contents

- [Usage](#usage)
- [Routes](#routes)
- [License](#license)
- [Features](#Features)

## Usage

1. Open the website using the following link:

    [Live website](https://note-taker23.herokuapp.com/)

2. Click the 'Get Started' button.

3. Enter your note's title and text into the right-hand portion of the screen.

4. Click the Save icon in the top right of the screen.

The following images show the web application's appearance and functionality:

![Application appearance](./assets/images/appearance.jpg)

![Application functionality](./assets/images/appearance2.jpg)

## Routes 

The following HTML routes are included:
* GET /notes returns the notes.html file.
* GET * returns the index.html file.

The following API routes are created:
* GET /api/notes reads the db.json file and returns all saved notes as JSON.
* POST /api/notes receives a new note to save on the request body, adds it to the db.json file, and returns the new note to the client

## License

This project is licensed under the MIT license. For more information on the MIT license, please use the following link: https://opensource.org/licenses/MIT.

## Features

1. JavaScript
2. Express.js
3. Node.js
4. npm
5. Bootstrap
6. Inquirer
7. JSON
8. Heroku
9. Insomnia