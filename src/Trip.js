/* eslint-disable max-len */
class Trip {
  constructor(tripData) {
    if (tripData instanceof Object) {
      this.id = tripData.id
      this.userID = tripData.userID
      this.destinationID = tripData.destinationID
      this.travelers = tripData.travelers
      this.date = tripData.date
      this.duration = tripData.duration
      this.status = tripData.status
      this.suggestedActivities = tripData.suggestedActivities
      this.destinationInfo;
    } 
  }

  addDestinationInfo(data) {
    this.destinationInfo = data.find((destination) => this.destinationID === destination.id)
  }

  returnEstimatedCostOfTrip() {
    let costForFlights = this.destinationInfo.estimatedFlightCostPerPerson * this.travelers
    let costForLodging = this.destinationInfo.estimatedLodgingCostPerDay * this.duration
    let tripCost = costForFlights + costForLodging
    return tripCost + (tripCost * .1)
  }
}

export default Trip;