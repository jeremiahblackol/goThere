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

  findTraveler(id) {
    return this.travelers instanceof Array ? this.travelers.find((traveler) => traveler.id === id) : 'User could not be found' 
  }

  findUserTrips(id) {
    return this.trips instanceof Array ? this.trips.filter((trip) => trip.userID === id) : 'User could not be found' 
  }
}

export default DataRepository;