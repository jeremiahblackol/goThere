import DataRepository from '../src/DataRepository.js'

class Agency extends DataRepository {
  constructor(data) {
    super(data); 
   
  }

  sortTripsByDate() {
    let numberedTripDates = this.trips.map((trip) => {
      trip.date = new Date(trip.date)
      console.log(trip)
      return trip
    })

    return numberedTripDates.sort((a, b) => a.date - b.date)
  }
}

export default Agency;