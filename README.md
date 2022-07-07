# pokedex-app

## Description

This is a web application that's designed using react js (Frontend javascript library) + redux (Library for dealing with global states of web applications, in this case a react app), there are some unit tests done using jest (library for testing js applications). 
Here you will see some features supported as:
* Login using email and password authentication (Implemented with Firebase)
* Login using google and facebook authentication (Implemented with Firebase)
* A searchable list of pokemons using the [pokemon API](https://pokeapi.co/api/v2/pokemon) and the redux store to avoid perform a big amount of requests to the public Pokemon's API due it has a limitation of 300 reqs/day 
* A Pokeball that means a user can have his/her own list of pokemons picking up their favorites in a star button placed in the home page (List of pokemons availables)
* In the Pokeball the user is able to edit the profile data (Height, Weight and Abilities) and see the evolutions of each Pokemon

## Firebase implementation
* Authentication providers (Email and Password, Google and Facebook)
* Firestore cloud database (Used for storing the pokeball content and the registration of each user using the app)

## Pre-requisites

* Node js v16.14.2 or later installed [Download](https://nodejs.org/es/download/)
* Firebase tools installed globally in your computer (Use the command `npm install -g firebase-tools`)
* Clone this repository and execute from a terminal the command `npm i` in the root folder `/pokedex-app` to install all the dependencies

## Run in local environment

Once reached the pre-requisites you should go to the root folder of the project `/pokedex-app` from a terminal and execute the command `npm run start`,
Finally go to the browser and type http://localhost:3000

## Unit test
* Go to the root folder `/pokedex-app` and execute the command `npm run test` you will see all the tests of the repository running

Note: The project is already configured to run with the firebase configuration of the owner, so it is not needed to reconfigure it.

## Deploy

1. Make sure you have installed the firebase-tools (Second dot of the Pre-requisites)
2. Execute the command `firebase login` (This will open up the browser to authenticate to firebase using your account, set your username and password if needed)
3. Execute the command `firebase init`
4. With the keyboard (space bar) select the hosting (hosting without set up github actions)
5. Select the project you have configured in firebase and that refer to this project and press space bar and enter
6. Write dist so the process create and configure that folder (this will be removed later)
7. Once generated the firebase configuration files, Remove the dist folder and execute the command `npm run build`
8. Execute the command `firebase deploy` and wait until the process return the deployed url

## Deployment Url
* https://pokedex-prueba-tecnica.web.app/login

