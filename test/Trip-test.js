const chai = require('chai')
import { expect } from 'chai'
import Trip from '../src/Trip.js'
import destinations from '../test-data/destinations-test-data.js'
import trips from '../test-data/trips-test-data.js'
import travelers from '../test-data/travelers-test-data.js'
import DataRepository from '../src/DataRepository.js'
const spies = require("chai-spies");
chai.use(spies);

describe('Trip', function() {

  let trip;
  let dataRepository;

  
  beforeEach(() => {
    let data = [travelers, trips, destinations]
    dataRepository = new DataRepository(data)
    trip = new Trip(dataRepository.findTrip(1))     
  })
  
  it('should be a function', function() {
    expect(Trip).to.be.a('function');
  });
  
  it('should instantiate new trip', function() {
    expect(trip).to.be.an.instanceof(Trip);
  });
  
  it('should have an id, userID, destinationID, travelers, date, duration, status, suggestedActivities', function() {
    expect(trip.id).to.equal(1);
    expect(trip.userID).to.equal(1);
    expect(trip.destinationID).to.equal(49);
    expect(trip.travelers).to.equal(1);
    expect(trip.date).to.equal("2019/09/16");
    expect(trip.duration).to.equal(8);
    expect(trip.status).to.equal('approved');
    expect(trip.suggestedActivities).to.deep.equal([]);
  });

  it('should be able to add a destination image to trip', function() {
    trip = new Trip(dataRepository.findTrip(27))     
    trip.addDestinationInfo(dataRepository.destinations)
    expect(trip.destinationInfo).to.deep.equal({
      "id": 7,
      "destination": "Paris, France",
      "estimatedLodgingCostPerDay": 100,
      "estimatedFlightCostPerPerson": 395,
      "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      "alt": "city during the day time with eiffel tower"
    });
  });
});
  
    
  