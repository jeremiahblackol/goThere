const chai = require('chai')
import { expect } from 'chai'
import trips from '../test-data/trips-test-data.js'
import Trip from '../src/Trip.js'
const spies = require("chai-spies");
chai.use(spies);

describe('Trip', function() {

  let trip;
  
  beforeEach(() => {
      
    trip = new Trip(trips)
         
  })
  
  it.skip('should be a function', function() {
    expect(Trip).to.be.a('function');
  });
  
  it.skip('should instantiate new trip', function() {
    expect(trip).to.be.an.instanceof(Trip);
  });
  
  it.skip('should have an id, userID, destinationID, travelers, date, duration, status, suggestedActivities', function() {
    expect(trip.id).to.equal('array');
    expect(trip.userID).to.equal('array');
    expect(trip.destinationID).to.equal('array');
    expect(trip.travelers).to.equal('array');
    expect(trip.date).to.equal('array');
    expect(trip.duration).to.equal('array');
    expect(trip.status).to.equal('array');
    expect(trip.suggestedActivities).to.equal('array');
  });
});
  
    
  