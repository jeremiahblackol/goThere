/* eslint-disable max-len */
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import DataRepository from '../src/DataRepository.js'
import Agency from '../src/Agency.js'
import Traveler from '../src/Traveler.js'
import Trip from '../src/Trip.js'



console.log('This is the JavaScript entry file - your code begins here.');

let documentBody = document.querySelector('body')

documentBody.addEventListener('click', clickHandler)

let travelers;
let trips;
let destinations;
let dataRepository;
let agency;
let traveler;

travelers = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
  .then(data => data.json())
  .then(data => data.travelers)
  .catch(err => console.log(err.message))

trips = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  .then(data => data.json())
  .then(data => data.trips)
  .catch(err => console.log(err.message))

destinations = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  .then(data => data.json())
  .then(data => data.destinations)
  .catch(err => console.log(err.message))


// PROMISE
Promise.all([travelers, trips, destinations])
  .then(data => {
    travelers = data[0];
    trips = data[1];
    destinations = data[2]
  })
  .then(() => {
    dataRepository = new DataRepository([travelers, trips, destinations]);
    agency = new Agency([travelers, trips, destinations])
  })
  .catch(err => {
    console.log(err.message)
  })

function clickHandler() {
  if (event.target.classList.contains('submit-button')) {
    validateForm()
  }
}


function validateForm() {
  let userName = document.querySelector('.user-name');
  let password = document.querySelector('.password');
  let errorMessage = document.querySelector('.error-message')
  const regex = /^traveler([1-9]|[1-4][0-9]|50)$/;
  const validPassword = 'travel2020';
  
  if (regex.test(userName.value) && password.value === validPassword) {
    const userID = parseInt(userName.value.replace( /^\D+/g, ''));
    const travelerInfo = dataRepository.findTraveler(userID)
    instantiateTraveler(travelerInfo, dataRepository.trips)
    greetTraveler()
    console.log(traveler)
    // i need to be able to isolate and return all data related to this traveler
    // probably search dataRepository
    // instantiate this traveler with relevant information
    // cards to display traveler information
  
  } 
  
  if (userName.value === 'agency' && password.value === validPassword) {
    greetAgent()
    // instantiate the agency
    // display all pending trips
    // need a search functionality for date and for user

  } 
  
  if (regex.test(userName.value) || userName.value === 'agency' && password.value !== validPassword) {
    password.value = ''
    errorMessage.innerText = 'Invalid Password' 
  }

  if (!regex.test(userName.value) || userName.value !== 'agency' && password === validPassword) {
    userName.value = ''
    errorMessage.innerText = 'Invalid Username'
  } 
}

const instantiateTraveler = (info, tripData) => {
  traveler = new Traveler (info)
  traveler.returnTravelerTrips(tripData)
  return traveler
}

const greetTraveler = () => {
  let body = document.querySelector('body')
  let spending = traveler.returnTravelerTotalSpent(dataRepository.destinations) 
  body.innerHTML = ''
  body.insertAdjacentHTML('beforebegin', `<div>Welcome, ${traveler.name}!</div><div>You have spent a total of $${spending} on trips to date!</div>`)
}

const greetAgent = () => {
  let body = document.querySelector('body')
  let earnings = agency.returnTotalEarnings()
  body.innerHTML = ''
  body.insertAdjacentHTML('beforebegin', `<div>Welcome, Travel Agent!</div><div>You have earned $${earnings} to date!</div>`)
}

const displayTravelCards = () => {

}
  
