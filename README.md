# Documentation: "Screenjudge"

Screenjudge is a single-page web application for browsing, reviewing, and managing movies and TV shows. The app is built with Node.js, Angular, and MongoDB.
Screenjudge is hosted with netlify and is availiable online on https://screenjudge.netlify.app     
The backend server is hosted with heroku and is availiable at https://safe-bastion-69310-45fc38dfab9b.herokuapp.com

To access the website, you can log in using the following credentials:
#### User Role:
- Username: user
- Password: password

#### Admin Role:
- Username: admin
- Password: password

Feel free to create new users, comments and reviews.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [Database](#database)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 20.12.0)
- [Angular CLI](https://angular.io/cli) (version 18.1.0)
- [MongoDB](https://www.mongodb.com/)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (version 8.11.5)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/MichaelDelser/movie_reviewer.git
    cd movie_reviewer
    ```

2. **Install backend dependencies:**

    ```sh
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**

    ```sh
    cd ../frontend
    npm install
    ```

## Running the Application

1. **Start MongoDB:**

   Make sure MongoDB is running on your machine. You can start it with the following command:

    ```sh
    mongod
    ```

2. **Run the backend server:**

    ```sh
    cd backend
    npm start
    ```

   The backend server will start on `http://localhost:3000`.

3. **Run the frontend server:**

    ```sh
    cd frontend
    ng serve
    ```

   The frontend server will start on `http://localhost:4200`.
   You might have to change the apiUrl variable in /environment/environments to `http://localhost:4200`.

## Project Structure

### Frontend

````
frontend
├── .angular
├── .vscode
├── dist
├── node_modules
├── public
├── src
│   ├── app
│   │   ├── admin
│   │   │   ├── admin.component.html
│   │   │   ├── admin.component.scss
│   │   │   └── admin.component.ts
│   │   ├── admin-movies
│   │   │   ├── admin-movies.component.html
│   │   │   ├── admin-movies.component.scss
│   │   │   └── admin-movies.component.ts
│   │   ├── admin-user-profile
│   │   │   ├── admin-user-profile.component.html
│   │   │   ├── admin-user-profile.component.scss
│   │   │   └── admin-user-profile.component.ts
│   │   ├── admin-users
│   │   │   ├── admin-users.component.html
│   │   │   ├── admin-users.component.scss
│   │   │   └── admin-users.component.ts
│   │   ├── favourites
│   │   │   ├── favourites.component.html
│   │   │   ├── favourites.component.scss
│   │   │   ├── favourites.component.spec.ts
│   │   │   └── favourites.component.ts
│   │   ├── guards
│   │   │   ├── auth.guard.ts
│   │   │   └── role.guard.ts
│   │   ├── home
│   │   │   ├── home.component.html
│   │   │   ├── home.component.scss
│   │   │   ├── home.component.spec.ts
│   │   │   └── home.component.ts
│   │   ├── interceptors
│   │   │   └── auth.interceptor.ts
│   │   ├── log-in
│   │   │   ├── log-in.component.html
│   │   │   ├── log-in.component.scss
│   │   │   ├── log-in.component.spec.ts
│   │   │   └── log-in.component.ts
│   │   ├── movie-details
│   │   │   ├── movie-details.component.html
│   │   │   ├── movie-details.component.scss
│   │   │   ├── movie-details.component.spec.ts
│   │   │   └── movie-details.component.ts
│   │   ├── review
│   │   │   ├── review.component.html
│   │   │   ├── review.component.scss
│   │   │   ├── review.component.spec.ts
│   │   │   └── review.component.ts
│   │   ├── search-bar
│   │   │   ├── search-bar.component.html
│   │   │   ├── search-bar.component.scss
│   │   │   ├── search-bar.component.spec.ts
│   │   │   └── search-bar.component.ts
│   │   ├── services
│   │   │   ├── admin.service.ts
│   │   │   ├── admin-movies.service.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── favourite.service.ts
│   │   │   ├── movie.service.ts
│   │   │   ├── review.service.ts
│   │   │   └── watchlist.service.ts
│   │   ├── sign-up
│   │   │   ├── sign-up.component.html
│   │   │   ├── sign-up.component.scss
│   │   │   ├── sign-up.component.spec.ts
│   │   │   └── sign-up.component.ts
│   │   ├── tv-show-details
│   │   │   ├── tv-show-details.component.html
│   │   │   ├── tv-show-details.component.scss
│   │   │   ├── tv-show-details.component.spec.ts
│   │   │   └── tv-show-details.component.ts
│   │   ├── watchlist
│   │   │   ├── watchlist.component.html
│   │   │   ├── watchlist.component.scss
│   │   │   ├── watchlist.component.spec.ts
│   │   │   └── watchlist.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   └── app.routes.ts
├── environments
│   ├── environment.prod.ts
│   └── environment.ts
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── proxy.conf.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
````

### Backend

````
backend
│
├── config
│ └── config.js
├── middleware
│ ├── admin.js
│ ├── auth.js
│ ├── authMiddleware.js
│ ├── checkAdmin.js
│ ├── errorHandler.js
│ └── validate.js
├── models
│ ├── Favourite.js
│ ├── Media.js
│ ├── Name.js
│ ├── Report.js
│ ├── Review.js
│ ├── TitleEpisode.js
│ ├── Upvote.js
│ ├── User.js
│ └── Watchlist.js
├── node_modules
├── routes
│ ├── admin.js
│ ├── auth.js
│ ├── favourites.js
│ ├── media.js
│ ├── reports.js
│ ├── reviews.js
│ ├── users.js
│ └── watchlists.js
├── app.js
├── package.json
├── package-lock.json
└── Procfile
````


## Environment Variables

### Frontend

The file `src/environments/environment.ts` in the `frontend` directory contains the environment variables to connect to the backend and the TMDB API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://safe-bastion-69310-45fc38dfab9b.herokuapp.com',
  tmdbApiKey: '27b4f09f3b159cbcf7c657d03906af83',
  tmdbApiUrl: 'https://api.themoviedb.org/3',
};
```

### Backend
No .env file is needed in the backend as all the environment variables are set through heroku:
The following variables already exists.

```ruby
JWT_SECRET=878e9d220f6a659282b07cd1d76e854edb359ac01c60c9e71d9220d5460892dd
MONGODB_URI=mongodb+srv://reviewServer:XZ6LIP3WEyR4OeFV@moviereviewer.7hbib0b.mongodb.net/?retryWrites=true&w=majority&appName=movieReviewer
````
To add other envronmental variables use:

```plaintext
heroku config:set KEY=VALUE
```

## Features

- User Authentication and Authorization
  ### Sign up
  ![/readme_images/img_3.png](/readme_images/img_3.png)
     - Contains elements to enter username, enter password (shows stars), confirm birthday (stars), sign-up and Cancel (navigate to login screen)
     - Form Validation: Checks if username and password is present and password has at least 6 characters
     - Encryption: Uses bcrypt library to generate a salt and encrypt the password
     - Token Generation: Uses JWT-Token to create a auth-token after successful registration
     - Automatic Login: After successful registrations new users are automatically logged in
     - Error Messages: Backend Provides useful error messages, frontend used to show them under the respective element but that got lost when trying to resolve a different bug during development
  ### Log in
  ![/readme_images/img.png](/readme_images/img.png)
     - Contains elements to enter username and password, submit them and a link in the greeting text that sends the user to the sign-up screen
     - Form Validation: Checks if username and password is present
     - Encryption: Uses bcrypt to compared the entered password without ever exposing it
     - Token Generation: Uses JWT-Token to create a auth-token after successful registration
     - Error Messages: Backend Provides useful error messages, frontend used to show them under the respective element but that got lost when trying to resolve a different bug during development
  ### Log out 
  - Logged in users always see the button to log out
  - Discards the user token and navigates back to the home screen
  ### Home
  ![/readme_images/img_2.png](/readme_images/img_2.png)
     - All pages show a navigation bar at the top, containing home, Log in, Sign up for browsers, Favourites, Watchlist, Log out for users and Favourites, Watchlist, Admin, Log out for admins
     - All pages show a disclaimer at the bottom to properly give credit to TMDB for using their database API
     - The Homepage shows a themed background image, a welcome text and a searchbar where the user can search for Movies and TV Shows
  ![/readme_images/img_4.png](/readme_images/img_4.png)
     - Movies are then displayed, together with their Name and Release Date. These images are clickable and lead the user to the details page of that movie
     - Users are shown pages of results and can navigate back and forth using buttons
  ### Movies- and TV-Show Details
  ![/readme_images/img_5.png](/readme_images/img_5.png)
     - The Details Page shows general details of a movie or TV show, including title, release date, catchphase and story, length, genre, production companies with logos, a poster and a backdrop image if availiable.
     - It would show a choice of backdrops to select but that feature is not finished yet.
     - Additionally users see buttons to add/remove the title to their watchlist and favourites, admins see the button to add/remove the title to the local database which allows them to perform admin actions on that movie.
     - Below the details, there is a reviews section
  ### Reviews
  ![/readme_images/img_7.png](/readme_images/img_7.png)
     - Browsers can see existing comments, a review consists of the title, th rating displayed as colored stars and the optional review text. An extra feature is the upvote system where users can upvote reviews if they found it helpful. Browsers can see these upvotes too
     - Users can add their own review to a movie. Title and rating is required and is marked as such. The rating is displayed as stars, mouseovering over these stars will highlight them and clicking will select a rating.
     - Users can additionally upvote existing reviews that were created by other users.
     ![/readme_images/img_8.png](/readme_images/img_8.png)
     - Users can edit their review by clicking the edit button, upvotes will persist.
     - Admin users can delete reviews by clicking the remove button
  ### Favourites
  ![/readme_images/img_9.png](/readme_images/img_9.png)
  - The favourites lists all the users favourite movies and shows in one page, together with some information
  - Users can remove them with the click of a button if they don't like the movie anymore
  ### Watchlist
  ![/readme_images/img_10.png](/readme_images/img_10.png)
  - The watchlist is similar, but with the difference that media is split into movies and tv shows for clarity.
  - Users can add movies to the favourites if they like the movie and mark them as watched to remove them from the watchlist
  - Since marking them as watched is reaching the goal of watching the movies in this case, the button is not red but blue
## Admin
![/readme_images/img_11.png](/readme_images/img_11.png)
  - The admin page contains simply a tabview, separated in different areas of the website
  - This allows to easily add more
  - There is a plan to add a report system for users, movies and reviews, this could not be implemented in time but admins would manage them through a page in the third tab of this page
  ### Admin-Users
  ![/readme_images/img_12.png](/readme_images/img_12.png)
  - This shows a table of all users, displaying userID, username and user role. The table can be sorted by clicking on the column headers.
  - Admins have the option to delete a user by clicking the delete button.
  - Clicking Create or Edit on one of the users navigates to the admin-user-profile page
  ### Admin-User-Profile
  ![/readme_images/img_16.png](/readme_images/img_16.png)
  -  Here Admins can create users similar to the sign up screen, however admins can choose role for the users.
  ![/readme_images/img_14.png](/readme_images/img_14.png)
  - When coming here to edit one of the users, the users data will be imported. Admins can promote other users to admin this way.
  - Because the password is treated in a secure way it won't be shown at all, if not edited it will stay as it was.
  - Labels are also changed from create to edit
  ### Admin-Movies
  ![/readme_images/img_13.png](/readme_images/img_13.png)
  - The movies section of the admin page shows all the  movies that have been added to the local database.
  - Because we don't want to alter TMDB's online database we can add titles to our own database which saves all the information about the title and allows us to edit them locally.
  - If a title exists locally search results will use the local data over TMDB's API data to display them.
  - Blacklisted movies won't be shown at all
  - The create and Edit function could not be completed in time and the buttons dont have any logic behind them.
## Database 
### MongoDB Atlas Cluster 
The application uses a MongoDB Atlas cluster, which can be accessed with the MONGODB_URI environment variable.

```ruby
MONGODB_URI=mongodb+srv://reviewServer:XZ6LIP3WEyR4OeFV@moviereviewer.7hbib0b.mongodb.net/?retryWrites=true&w=majority&appName=movieReviewer
````

To get an overview of the Database, download MongoDBCompass and enter this URI to connect to the database.

## Database Schemas
### User Schema
```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, minlength: 7, trim: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});
```

### Favourite Schema
```javascript
const favouriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: String, required: true }, // TMDB ID
  itemType: { type: String, enum: ['movie', 'tv'], required: true },
  addedAt: { type: Date, default: Date.now }
});
```

### Watchlist Schema
```javascript
const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: String, required: true }, // TMDB ID
  itemType: { type: String, enum: ['movie', 'tv'], required: true },
  addedAt: { type: Date, default: Date.now }
});
```

### Review Schema
```javascript
const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  content_id: { type: String, required: true, index: true },
  content_type: { type: String, required: true, enum: ['Movie', 'TVShow', 'Episode'] },
  title: { type: String, required: true, minlength: 5, maxlength: 100 },
  content: { type: String, validate: { validator: function(value) { return !value || (value.length >= 10 && value.length <= 1000); }, message: 'Content must be between 10 and 1000 characters if provided' }},
  rating: { type: Number, required: [true, 'Rating is required'], min: [1, 'Rating must be at least 1'], max: [10, 'Rating cannot exceed 10'] },
  helpfulness: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
```

### Upvote Schema
```javascript
const upvoteSchema = new mongoose.Schema({
  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
```
### Media Schema
```javascript
const MediaSchema = new Schema({
  adult: { type: Boolean, default: false },
  backdrop_path: { type: String },
  belongs_to_collection: {
    id: { type: Number },
    name: { type: String },
    poster_path: { type: String },
    backdrop_path: { type: String }
  },
  budget: { type: Number },
  genres: [{ id: { type: Number }, name: { type: String } }],
  homepage: { type: String },
  tmdb_id: { type: Number, required: true },
  imdb_id: { type: String },
  origin_country: [{ type: String }],
  original_language: { type: String },
  original_title: { type: String },
  original_name: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  poster_path: { type: String },
  production_companies: [{
    id: { type: Number },
    logo_path: { type: String },
    name: { type: String },
    origin_country: { type: String }
  }],
  production_countries: [{ iso_3166_1: { type: String }, name: { type: String } }],
  release_date: { type: String },
  revenue: { type: Number },
  runtime: { type: Number },
  spoken_languages: [{ english_name: { type: String }, iso_639_1: { type: String }, name: { type: String } }],
  status: { type: String },
  tagline: { type: String },
  title: { type: String },
  video: { type: Boolean, default: false },
  vote_average: { type: Number },
  vote_count: { type: Number },
  created_by: [{
    id: { type: Number },
    credit_id: { type: String },
    name: { type: String },
    original_name: { type: String },
    gender: { type: Number },
    profile_path: { type: String }
  }],
  episode_run_time: [{ type: Number }],
  first_air_date: { type: String },
  in_production: { type: Boolean },
  languages: [{ type: String }],
  last_air_date: { type: String },
  last_episode_to_air: {
    id: { type: Number },
    name: { type: String },
    overview: { type: String },
    vote_average: { type: Number },
    vote_count: { type: Number },
    air_date: { type: String },
    episode_number: { type: Number },
    episode_type: { type: String },
    production_code: { type: String },
    runtime: { type: Number },
    season_number: { type: Number },
    show_id: { type: Number },
    still_path: { type: String }
  },
  name: { type: String },
  next_episode_to_air: { type: Schema.Types.Mixed },
  networks: [{
    id: { type: Number },
    logo_path: { type: String },
    name: { type: String },
    origin_country: { type: String }
  }],
  number_of_episodes: { type: Number },
  number_of_seasons: { type: Number },
  seasons: [{
    air_date: { type: String },
    episode_count: { type: Number },
    id: { type: Number },
    name: { type: String },
    overview: { type: String },
    poster_path: { type: String },
    season_number: { type: Number },
    vote_average: { type: Number }
  }],
  mediaType: { type: String, enum: ['movie', 'tv'], required: true },
  isBlacklisted: { type: Boolean, default: false }
});
```

### Report Schema
Reports are not yet implemented in the frontend
```javascript
const reportSchema = new mongoose.Schema({
  reference_id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  reason: {
    type: String,
    required: [true, 'Reason is required'],
    minlength: [10, 'Reason must be at least 10 characters long'],
    maxlength: [500, 'Reason cannot exceed 500 characters']
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});
```

### Getting a Database Dump

A database dump is available in the /database_dump/ folder.

To create a backup of your MongoDB Atlas database, you can use the mongodump utility, which is part of the MongoDB Database Tools. Follow these steps:

Install MongoDB Database Tools:

If you haven't installed the MongoDB Database Tools, you can download and install them from the MongoDB Database Tools page.

Run mongodump:

Use the following command to create a backup of your MongoDB database:

```sh
mongodump --uri="mongodb+srv://reviewServer:XZ6LIP3WEyR4OeFV@moviereviewer.7hbib0b.mongodb.net/?retryWrites=true&w=majority&appName=movieReviewer" --out=/path/to/backup/directory
```
Replace /path/to/backup/directory with the path where you want to save the backup.


## Deployment
### Frontend (Netlify)
Connect GitHub Repository:

Go to Netlify and connect your GitHub repository.
```plaintext
https://github.com/MichaelDelser/movie_reviewer
```

Set the build command to ng build --prod.
Set the publish directory to dist/frontend.
Environment Variables:

Add apiUrl with the value https://safe-bastion-69310-45fc38dfab9b.herokuapp.com.

### Backend (Heroku)
#### Create a Heroku App:

Go to Heroku and create a new app.
Connect your GitHub repository.
Set Environment Variables:

Set JWT_SECRET and MONGODB_URI in the Heroku app settings.
### Development:

To further develop the backend code to Heroku by navigating to the backend directory and typing

```shell
git add .
git commit -m "Insert-commit-message-here"
git add heroku master
```

## Contributing
Contributions are welcome! Please follow these steps to contribute:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes and push them to your forked repository.
- Create a pull request to the main repository.

## Project timeline

- 3.7.2024 - Received assigment
- 3.7 - 10.7: Analysis Phase
  - Analysis of project requirements.
  - Installation of Angular, Node.js, MongoDB, Git
  - Getting to know Heroku and Stackblitz
- 10.7 - 13.7: Planning Phase
  - Creating the database model
  - Creating a rough page layout
  - Signing up to Amazon AWS and TMDB
- 14.7 - 22.7: Development phase
  - Setting up database
  - Setting up the server, connecting to the database
  - Setting up database models in node.js
  - Setting up routing 
  - Starting frontend development, first in stackblitz, later developing using webmaster
  - Parallel development of front and backend to extend the backend api if needed
  - Continuous deployment through Heroku and Netlify, both services are linked to the github repository
- 22.7 - 25.7: Final touch ups
  - Added file comments
  - Improved the visual representation by editing the html and scss without changing functionality
- 25.7 - 26.7: Documentation and final bugfixes
  - Wrote this documentation
  - Final user testing and bugfixing
- 26.7, 2 pm: Submitting the project

## Reflections on the Project

All in all the project was very interesting. It was a much greater challenge than expected but also a lot of fun.


#### Challenges:

It was difficult to gain acces to the Amazon AWS service because the sign up to the API required a working URL which I didn't have at the time. As an alternative I used the TMDB API which worked great and was free to use as long as they are given proper credit.
Using stackblitz also posed some difficulties which is the reason the project was re-set up using webmaster.
Stackblitz worked well to set up the project initially, 
however getting a website online using stackblitz was not possible. 
The re set up was a major setback but getting a single working github project lead to successfully hosting the heroku and netlify service.

During later development a repository reset lead to unvoluntarily deleting some backend progress which cost valuable time.
Towards the end the authentification method changed, not sure how but it was necessary to debug and rework the authentification process.
Also error messages aren't displayed the same way as before, however there was no more time to fix that before meeting the assignment deadline.
#### Lessons learned:
Being unfamiliar with the tools lead to the application needing a couple of reworks, which caused quite a bit of stress.
Despite the difficulties, the experiences made with Angular, Node, MongoDB, Heroku, partially Stackblitz and Netlify were well worth the effort.
In conclusion the project was a great challenge but one that was fun to overcome and brought valuable knowledge for future, real world application.
It probably would have been fun to actually do it as a group project.