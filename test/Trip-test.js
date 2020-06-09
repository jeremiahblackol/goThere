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
});
  
    
  