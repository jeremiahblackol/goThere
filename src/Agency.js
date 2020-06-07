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
    // let shallowCopyOfTrips = this.trips.slice()
    // let tripsWithSplitDates = shallowCopyOfTrips.map((trip) => {
    //   trip.date = trip.date.split('/')
    //   return trip
    // })

    // let tripsSortedByYear = tripsWithSplitDates.sort((a, b) => a.date[0] - b.date[0])
    // // let tripsSortedByMonth = tripsSortedByYear.reduce((byMonth, trip) => {

    // // }, [])
    // console.log(tripsSortedByYear)
  }
}

export default Agency;