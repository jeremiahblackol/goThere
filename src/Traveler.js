import DataRepository from '../src/DataRepository.js'


class Traveler {
  constructor(travelerData, data) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips;
  }

  returnTravelerTrips(data) {
    this.trips = data.trips.filter((trip) => trip.userID === this.id)
    return this.trips
  }

  returnCurrentTrip(date) {
    const re = /\d{4}\/\d{2}\/\d{2}/;
    if (re.test(date)) {
      let tripToday = this.trips.find((trip) => trip.date === date);
      return tripToday ? tripToday : 'Sorry, no trip today'
    } else {
      return "Please, use 'YYYY/MM/DD' format"
    }
  }

  returnPendingTrips() {
    return this.trips.filter((trip) => trip.status === 'pending')
  }
}

export default Traveler;