/* eslint-disable max-len */
const chai = require('chai')
import { expect } from 'chai'
import destinations from '../test-data/destinations-test-data.js'
import trips from '../test-data/trips-test-data.js'
import travelers from '../test-data/travelers-test-data.js'
import DataRepository from '../src/DataRepository.js'

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
    expect(dataRepository.findUserTrips(1)).to.deep.equal([
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

  it.skip('should return an error message if invalid userID is passed in', function() {
    expect(dataRepository.findAllUserInfo('flappy')).to.equal('Sorry, invalid userID!')
  });

  it.skip('should return an error message if no data can be found relative to user', function() {
    expect(dataRepository.findAllUserInfo(84)).to.equal('Sorry, no data could be found for user 84')
    expect(dataRepository.findAllUserInfo(1043)).to.equal('Sorry, no data could be found for user 1043')
  });

  it.skip('should return a message if user can be found, but no trip data can be found relative to that user', function() {
    expect(dataRepository.findAllUserInfo(96)).to.equal('Sorry, Mister Mix-It-Up doesn\'nt have any trip information!')
  });
});

  
