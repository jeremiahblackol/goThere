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
}

export default Agency;