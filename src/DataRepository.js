/* eslint-disable max-len */
class DataRepository {
  constructor(data) {
    this.allData = this.checkIfDataIsAnArray(data);
    this.travelers = data[0];
    this.trips = data[1];
    this.destinations = data[2]
  }

  checkIfDataIsAnArray(dataset) {
    if (dataset instanceof Array) {
      return dataset.map((data) => {
        return data instanceof Array ? data : `Sorry, no ${data} data could be found at this time!`
      })
    } else {
      return 'Sorry, no data could be found at this time'
    }
  }

  // need to refactor this to accomodate all three datasets
  findTraveler(id) {
    if (id === Number(id) && this.travelers.find((traveler) => traveler.id === id)) {
      return this.travelers.find((traveler) => traveler.id === id)
    } else {
      return 'Sorry, invalid userID!'
    }
  }

  findTravelerTrips(id) {
    if (id === Number(id) && this.trips.filter((trip) => trip.userID === id).length > 0) {
      return this.trips.filter((trip) => trip.userID === id)  
    }  else {
      return 'Sorry, invalid userID!'
    }
  }

  // this will be part of the refactor
  findTrip(tripID) {
    let trip = this.trips.find((trip) => trip.id === tripID)
    return trip ? trip : 'Sorry, invalid tripID!'
  }

  findDestination(id) {
    let destination = this.destinations.find((destination) => destination.id === id)
    return destination ? destination : 'Sorry, invalid destination!'
  }
}

export default DataRepository;