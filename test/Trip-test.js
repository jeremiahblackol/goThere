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
  
  it.skip('should instantiate new DataRepositories', function() {
    expect(trip).to.be.an.instanceof(Trip);
  });
  
  it.skip('should be able to hold an array of all data', function() {
    expect(dataRepository.allData).to.be.an('array');
    expect(dataRepository.allData[0]).to.be.an('array');
    expect(dataRepository.allData[1]).to.be.an('array');
    expect(dataRepository.allData[2]).to.be.an('array');
  });
});
  
    
  