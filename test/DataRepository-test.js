/* eslint-disable max-len */
const chai = require('chai')
import { expect } from 'chai'
import destinations from '../test-data/destinations-test-data.js'
import trips from '../test-data/trips-test-data.js'
import travelers from '../test-data/travelers-test-data.js'
import DataRepository from '../src/DataRepository.js'
import Trip from '../src/Trip.js'


describe('DataRepository', function() {

  let dataRepository;

  beforeEach(() => {
    
    let data = [travelers, trips, destinations]
    dataRepository = new DataRepository(data)
       
  })

  it('should be a function', function() {
    expect(DataRepository).to.be.a('function');
  });

  it('should instantiate new DataRepositories', function() {
    expect(dataRepository).to.be.an.instanceof(DataRepository);
  });

  it('should be able to hold an array of all data', function() {
    expect(dataRepository.allData).to.be.an('array');
    expect(dataRepository.allData[0]).to.be.an('array');
    expect(dataRepository.allData[1]).to.be.an('array');
    expect(dataRepository.allData[2]).to.be.an('array');
  });

  it('should return an error message if any data passed in is not an array', function() {
    dataRepository = new DataRepository([travelers, 'trips', destinations])
    expect(dataRepository.allData).to.be.an('array');
    expect(dataRepository.allData[0]).to.be.an('array');
    expect(dataRepository.allData[1]).to.equal('Sorry, no trips data could be found at this time!');
    expect(dataRepository.allData[2]).to.be.an('array');
  });

  it('should return an error message if any data passed in is not an array', function() {
    dataRepository = new DataRepository('data')
    expect(dataRepository.allData).to.equal('Sorry, no data could be found at this time');
  });

  it('should be able to return a traveler', function() {
    expect(dataRepository.findTraveler(1)).to.deep.equal(
      {  
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer"
      });
  });

  it('should be able to return a a traveler\'s trip information', function() {
    expect(dataRepository.findTravelerTrips(1)).to.deep.equal([
      {
        "id": 1,
        "userID": 1,
        "destinationID": 49,
        "travelers": 1,
        "date": "2019/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
      }, {
        "id": 21,
        "userID": 1,
        "destinationID": 10,
        "travelers": 1,
        "date": "2020/01/28",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
      }
    ])
  });

  it('should return an error message if invalid userID is passed in', function() {
    expect(dataRepository.findTraveler('flappy')).to.equal('Sorry, invalid userID!')
    expect(dataRepository.findTravelerTrips('flappy')).to.equal('Sorry, invalid userID!')
  });

  it('should return an error message if no data can be found relative to user', function() {
    expect(dataRepository.findTraveler(69)).to.equal('Sorry, invalid userID!')
    expect(dataRepository.findTraveler(804)).to.equal('Sorry, invalid userID!')
    expect(dataRepository.findTravelerTrips(139)).to.equal('Sorry, invalid userID!')
    expect(dataRepository.findTravelerTrips(1043)).to.equal('Sorry, invalid userID!')
  });

  it('should be able to return a trip', function() {
    expect(dataRepository.findTrip(1)).to.deep.equal({
      "id": 1,
      "userID": 1,
      "destinationID": 49,
      "travelers": 1,
      "date": "2019/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
    })
    expect(dataRepository.findTrip('flappy')).to.equal('Sorry, invalid tripID!')
  });

  it('should be able to return a destination', function() {
    expect(dataRepository.findDestination(1)).to.deep.equal({
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
    })

    expect(dataRepository.findDestination(200)).to.equal('Sorry, invalid destination!')
  });

  it('should be to add destination image and alt to trips', function() {
    let trip = new Trip(dataRepository.findTrip(1))

    expect(dataRepository.addImageToTrips(trip.destinationID)).to.deep.equal({
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
    })

    expect(dataRepository.findDestination(200)).to.equal('Sorry, invalid destination!')
  });
});

  
