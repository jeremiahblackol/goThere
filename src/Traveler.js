/* eslint-disable max-len */
class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips;
  }

  returnTravelerTrips(data) {
    this.trips = data.filter((trip) => trip.userID === this.id)
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

  returnTravelerTotalSpent(data) {
    let tripsPaidFor = this.trips.filter((trip) => trip.status === 'approved')
    return tripsPaidFor.reduce((totalCost, trip) => {
      data.forEach((destination) => {
        if (trip.destinationID === destination.id) {
          let costForFlights = destination.estimatedFlightCostPerPerson * trip.travelers
          let costForLodging = destination.estimatedLodgingCostPerDay *  trip.duration
          let tripCost = costForFlights + costForLodging
          totalCost += tripCost + (tripCost * .1)
        }
      })
      return Number(totalCost.toFixed(2))
    }, 0)
  }
}

export default Traveler;