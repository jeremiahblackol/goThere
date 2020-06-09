const chai = require('chai')
import { expect } from 'chai'
import Trip from '../src/Trip.js'
import destinations from '../test-data/destinations-test-data.js'
import trips from '../test-data/trips-test-data.js'
import travelers from '../test-data/travelers-test-data.js'
import DataRepository from '../src/DataRepository.js'
import Destination from '../src/Destination.js'
const spies = require("chai-spies");
chai.use(spies);

describe('Destination', function() {

  let trip;
  let dataRepository;
  let destination;

  
  beforeEach(() => {
    let data = [travelers, trips, destinations]
    dataRepository = new DataRepository(data)
    trip = new Trip(dataRepository.findTrip(1)) 
    destination = new Destination()    
  })
  
  it('should be a function', function() {
    expect(Destination).to.be.a('function');
  });
  
  it('should instantiate new trip', function() {
    expect(destination).to.be.an.instanceof(Destination);
  });
  
  it('should have an id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson, image, alt, status', function() {
    expect(destination.id).to.equal(1);
    expect(destination.destination).to.equal(1);
    expect(destination.estimatedLodgingCostPerDay).to.equal(49);
    expect(destination.estimatedFlightCostPerPerson).to.equal(1);
    expect(destination.image).to.equal("2019/09/16");
    expect(destination.alt).to.equal(8);
    expect(destination.status).to.equal('approved');
  });
});
  
    
  