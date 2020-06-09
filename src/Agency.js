/* eslint-disable max-len */
import DataRepository from '../src/DataRepository.js'

class Agency extends DataRepository {
  constructor(data) {
    super(data); 
   
  }

  sortTripsByDate() {
    return this.trips.sort((a, b) => {
      if (b.date > a.date) {
        return -1
      } else if (b.date < a.date) {
        return 1
      }
    })
  }

  returnAllPendingTrips() {
    return this.trips.filter((trip) => {
      return trip.status === 'pending' ? trip : null
    })
  }

  approveTripRequest(id) {
    if (id === Number(id)) {
      return this.trips.find((trip) => {
        return trip.id === id && trip.status === 'pending' ? trip.status = 'approved' : null
      })
    } else {
      return 'Sorry, invalid trip!'
    }
  }

  returnTotalEarnings() {
    let tripsPaidFor = this.trips.filter((trip) => trip.status === 'approved')
    return tripsPaidFor.reduce((totalEarnings, trip) => {
      this.destinations.forEach((destination) => {
        if (trip.destinationID === destination.id) {
          let costForFlights = destination.estimatedFlightCostPerPerson * trip.travelers
          let costForLodging = (destination.estimatedLodgingCostPerDay * trip.travelers) * trip.duration
          let tripCost = costForFlights + costForLodging
          totalEarnings += tripCost * .1
        }
      })
      return Number(totalEarnings.toFixed(2))
    }, 0)
  }
}

export default Agency;