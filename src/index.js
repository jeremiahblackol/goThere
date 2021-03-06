/* eslint-disable max-len */
import './css/base.scss';


import DataRepository from '../src/DataRepository.js'
import Agency from '../src/Agency.js'
import Traveler from '../src/Traveler.js'
import Trip from '../src/Trip.js'
import Destination from '../src/Destination.js'

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
    approveOrDenyTripCard(event.target.id)
  }

  if (event.target.classList.contains('approve')) {
    approveTrip(Number(event.target.id))
  }

  if (event.target.classList.contains('deny')) {
    denyTrip(Number(event.target.id))
  }

  if (event.target.classList.contains('inquire') && isTraveler) {
    bookTripCard(event.target.id)
  }

  if (event.target.classList.contains('book')) {
    let id = event.target.id
    let startDate = '2020/08/19'
    let numberOfTravelers = document.getElementById('traveler-count').value
    let duration = document.getElementById('trip-duration').value
    bookTrip(id, startDate, numberOfTravelers, duration)
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

const approveOrDenyTripCard = (id) => {
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
  <button id='${trip.id}' class='approve'>APPROVE</button>
  <button id='${trip.id}' class='deny'>DENY</button>
  </div>`)
}

const bookTripCard = (id) => {
  id = Number(id)
  let cardSection = document.querySelector('.all-cards')
  cardSection.innerHTML = ''
  let destination = new Destination(dataRepository.findDestination(id))    
  cardSection.insertAdjacentHTML('beforeend', `<div id='${destination.id}'
  class='trip-card'>
  <header id='${destination.id}' class='card-header'>
  <span id='${destination.id}'>${destination.destination}</span>
  </header>
  <img id='${destination.id}' tabindex='0' class='card-picture'
  src='${destination.image}' alt=${destination.alt}>
  <section>
  <p>ENTER NUMBER OF TRAVELERS: </p>
  <input id='traveler-count' type='number'></input>
  </section>
  <br>
  <section>
  <p>HOW LONG WOULD YOU LIKE TO GO? </p>
  <input id='trip-duration' type='number'></input>
  </section>
  <br>
  <section class='estimated-cost'></section>
  <button id='${destination.id}' class='book'>BOOK</button>
  <button id='${destination.id}' class='estimate'>ESTIMATE COST</button>
  </div>`)
}

const approveTrip = (tripID) => {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/updateTrip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'id': tripID, 
      'status': 'approved'
    })
  })
    .then(response => response.json())
    .then((data) => {
      console.log('Success:', data) 
    })
    .catch(err => console.log(err.message));
  fetchTravelersAndTrips()
}

const denyTrip = (tripID) => {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'id': tripID, 
    })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(`Trip ${tripID} has been deleted`, data) 
    })
    .catch(err => console.log(err.message));
  fetchTravelersAndTrips()
}

const bookTrip = (id, startDate, numberOfTravelers, duration) => {
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'id': Date.now(), 
      'userID': Number(traveler.id), 
      'destinationID': Number(id), 
      'travelers': Number(numberOfTravelers), 
      'date': startDate, 
      'duration': Number(duration), 
      'status': 'pending', 
      'suggestedActivities': []
    })
  })
    .then(response => response.json())
    .then((data) => {
      console.log('Success:', data) 
    })
    .catch(err => console.log(err.message));

}


const fetchTravelersAndTrips = () => {
  travelers = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
    .then(data => data.json())
    .then(data => data.travelers)
    .catch(err => console.log(err.message))

  trips = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
    .then(data => data.json())
    .then(data => data.trips)
    .catch(err => console.log(err.message))

  Promise.all([travelers, trips])
    .then(data => {
      travelers = data[0];
      trips = data[1];
    })
    .then(() => {
      dataRepository = new DataRepository([travelers, trips, destinations]);
      agency = new Agency([travelers, trips, destinations])
      console.log(dataRepository)
    })
    .catch(err => {
      console.log(err.message)
    })
}







  
