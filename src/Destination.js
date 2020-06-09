class Destination {
  constructor(data) {
    if (data instanceof Object) {
      this.id = data.id
      this.destination = data.destination
      this.estimatedLodgingCostPerDay = data.estimatedLodgingCostPerDay
      this.estimatedFlightCostPerPerson = data.estimatedFlightCostPerPerson
      this.image = data.image
      this.alt = data.alt
    }
  }
}

export default Destination;