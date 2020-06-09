const chai = require('chai')
import { expect } from 'chai'
import travelers from '../test-data/travelers-test-data.js'
import trips from '../test-data/trips-test-data.js'
import destinations from '../test-data/destinations-test-data.js'
import DataRepository from '../src/DataRepository.js'
import Destination from '../src/Destination.js'
const spies = require("chai-spies");
chai.use(spies);

describe('Destination', function() {

  let dataRepository;
  let destination;

  
  beforeEach(() => {
    let data = [travelers, trips, destinations]
    dataRepository = new DataRepository(data)
    destination = new Destination(dataRepository.findDestination(1))    
  })
  
  it('should be a function', function() {
    expect(Destination).to.be.a('function');
  });
  
  it('should instantiate new trip', function() {
    expect(destination).to.be.an.instanceof(Destination);
  });
  
  it('should have an id, destination, estimatedLodgingCostPerDay, estimatedFlightCostPerPerson, image, alt', function() {
    expect(destination.id).to.equal(1);
    expect(destination.destination).to.equal("Lima, Peru");
    expect(destination.estimatedLodgingCostPerDay).to.equal(70);
    expect(destination.estimatedFlightCostPerPerson).to.equal(400);
    expect(destination.image).to.equal( "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
    expect(destination.alt).to.equal("overview of city buildings with a clear sky");
  });
});
  
    
  