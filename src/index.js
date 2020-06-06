/* eslint-disable max-len */
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import DataRepository from '../src/DataRepository.js'
import Agency from '../src/Agency.js'

console.log('This is the JavaScript entry file - your code begins here.');

let documentBody = document.querySelector('body')

documentBody.addEventListener('click', clickHandler)

let travelers;
let trips;
let destinations;
let dataRepository;
let agency;

travelers = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
  .then(data => data.json())
  .then(data => console.log(data.travelers))
  .catch(err => console.log(err.message))

trips = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  .then(data => data.json())
  .then(data => console.log(data.trips))
  .catch(err => console.log(err.message))

destinations = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  .then(data => data.json())
  .then(data => console.log(data.destinations))
  .catch(err => console.log(err.message))


// PROMISE
Promise.all([travelers, trips, destinations])
  .then(data => {
    travelersData = data[0];
    tripsData = data[1];
    destinationsData = data[2]
  })
  .then(() => {
    dataRepository = new DataRepository([travelersData, tripsData, destinationsData]);
    agency = new Agency([travelersData, tripsData, destinationsData])
    console.log(data)
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
  const userName = document.querySelector('.user-name').value;
  const password = document.querySelector('.password').value;
  const regex = /^traveler([1-9]|[1-4][0-9]|50)$/;
  const validPassword = 'travel2020';
  
  if (regex.test(userName) && password === validPassword) {
    console.log('traveler')
  
  } else if (userName === 'agency' && password === validPassword) {
    console.log('agency')

  } else {
    console.log('hey')
  }
}
  
