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
import Destination from '../src/Destination.js'



console.log('This is the JavaScript entry file - your code begins here.');

let documentBody = document.querySelector('body')

documentBody.addEventListener('click', clickHandler)

let travelers;
let trips;
let destinations;
let dataRepository;
let agency;
let traveler;
let isTraveler;

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

  if (event.target.classList.contains('destinations')) {
    destinationCards()
  }

  if (event.target.classList.contains('pending-trips')) {
    let pendingTrips = isTraveler ? traveler.returnPendingTrips() : agency.returnAllPendingTrips()
    displayPendingTrips(pendingTrips)
  }

  if (event.target.classList.contains('agent-info')) {
    approveOrDenyTrip(event.target.id)
  }

  if (event.target.classList.contains('inquire')) {
    console.log(event.target.id)
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
    isTraveler = true;
  } 
  
  if (userName.value === 'agency' && password.value === validPassword) {
    isTraveler = false;
    greetAgent()
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
  let spending = traveler.returnTravelerTotalSpent(dataRepository.destinations) 
  documentBody.innerHTML = ''
  documentBody.insertAdjacentHTML('beforebegin', 
    `<div class='traveler-header' aria-label='welcome'>Welcome, ${traveler.name}!</div>
  <div class='traveler-header' aria-label='guest spent'><h2>You have spent a total of <span>
  $${spending}</span> on trips to date!</h2></div>`)

  documentBody.insertAdjacentHTML('afterbegin', `<section class='button-section'>
    <button class='pending-trips'aria-label='pending trips'>Pending Trips</button>
    <button aria-label='past trips'>Past Trips</button>
    <button aria-label='Today's trips'>Today's Trip</button>
    <button aria-label='upcoming trips'>Upcoming Trips</button>
    <button class='destinations' aria-label='destinations'>Destinations</button>
  </section>`)

  documentBody.insertAdjacentHTML('beforeend', 
    `<section class='all-cards'>
  </section>`)
}

const greetAgent = () => {
  let earnings = agency.returnTotalEarnings()
  documentBody.innerHTML = ''
  documentBody.insertAdjacentHTML('beforebegin', 
    `<div class='traveler-header' aria-label='welcome'>Welcome, Travel Agent!</div>
    <div class='traveler-header' aria-label='agent earnings'><h2>You have earned $${earnings} to date!</h2></div>`)

  documentBody.insertAdjacentHTML('afterbegin', `<section class='button-section'>
    <button class='pending-trips'aria-label='pending trips'>Pending Trips</button>
    <button aria-label='past trips'>Past Trips</button>
    <button aria-label='Today's trips'>Today's Trip</button>
    <button aria-label='upcoming trips'>Upcoming Trips</button>
    <button class='destinations' aria-label='destinations'>Destinations</button>
  </section>`)

  documentBody.insertAdjacentHTML('beforeend', 
    `<section class='all-cards'>
</section>`)
}

const destinationCards = () => {
  let cardSection = document.querySelector('.all-cards')
  cardSection.innerHTML = ''
  dataRepository.destinations.forEach((destinationData) => {
    let destination = new Destination (destinationData)
    cardSection.insertAdjacentHTML('beforeend', `<div id='${destination.id}'
        class='card'>
        <header id='${destination.id}' class='card-header'>
        <span id='${destination.id}'>${destination.destination}</span>
        </header>
        <img id='${destination.id}' tabindex='0' class='card-picture'
        src='${destination.image}' alt=${destination.alt}>
        <section>
        <button class='inquire' id='${destination.id}'type='button'>INQUIRE</button>
        </section>
        </div>`)
  })
}

const displayPendingTrips = (whichPendingTrips) => {
  let cardSection = document.querySelector('.all-cards')
  cardSection.innerHTML = ''
  whichPendingTrips.forEach((tripData) => {
    let trip = new Trip (tripData)
    trip.addDestinationInfo(dataRepository.destinations)
    cardSection.insertAdjacentHTML('beforeend', `<div id='${trip.id}'
        class='card'>
        <header id='${trip.id}' class='card-header'>
        <span id='${trip.id}'>${trip.destinationInfo.destination}</span>
        </header>
        <img id='${trip.destinationInfo.id}' tabindex='0' class='card-picture'
        src='${trip.destinationInfo.image}' alt=${trip.destinationInfo.alt}>
        <section>
        ${travelerOrAgencyPendingTrips(trip)}
        </section>
        </div>`)
  })
}

const travelerOrAgencyPendingTrips = (trip) => {
  const travelerFooter = `<p>TRIP PENDING</p>
  <p>ESTIMATED COST: $${trip.returnEstimatedCostOfTrip()}</p>`

  const agencyFooter = `<button class='agent-info'id='${trip.id}' type='button'>INFO</button>`

  return isTraveler ? travelerFooter : agencyFooter 
}

const approveOrDenyTrip = (id) => {
  id = Number(id)
  let cardSection = document.querySelector('.all-cards')
  cardSection.innerHTML = ''
  let trip = new Trip(dataRepository.findTrip(id))    
  trip.addDestinationInfo(dataRepository.destinations)
  cardSection.insertAdjacentHTML('beforeend', `<div id='${trip.id}'
  class='trip-card'>
  <header id='${trip.id}' class='card-header'>
  <span id='${trip.id}'>${trip.destinationInfo.destination}</span>
  </header>
  <img id='${trip.destinationInfo.id}' tabindex='0' class='card-picture'
  src='${trip.destinationInfo.image}' alt=${trip.destinationInfo.alt}>
  <h2>TRAVELER NAME: ${dataRepository.findTraveler(trip.userID).name}</h2>
  <h2>NUMBER OF TRAVELERS: ${trip.travelers}</h2>
  <h2>ESTIMATED TOTAL EARNINGS: $${trip.returnEstimatedCostOfTrip()}</h2>
  <button>APPROVE</button>
  <button>DENY</button>
  </div>`)
}

//POST WITH APPROVE BUTTON
//DELETE WITH DENY BUTTON
//need a create cards function that will generate all cards
//need a calender to pick dates, an input for number of guests, 






  
