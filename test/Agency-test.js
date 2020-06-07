/* eslint-disable max-len */
const chai = require('chai')
import { expect } from 'chai'
import destinations from '../test-data/destinations-test-data.js'
import trips from '../test-data/trips-test-data.js'
import travelers from '../test-data/travelers-test-data.js'
import DataRepository from '../src/DataRepository.js'
import Agency from '../src/Agency.js'
const spies = require("chai-spies");
chai.use(spies);

describe('Agency', function() {

  let dataRepository;
  let agency;
  let data;

  beforeEach(() => {
    
    data = [travelers, trips, destinations]
    dataRepository = new DataRepository(data)
    agency = new Agency(data)

  })

  it('should be a function', function() {
    expect(Agency).to.be.a('function');
  });

  it('should instantiate new Agencies', function() {
    expect(agency).to.be.an.instanceof(Agency);
  });

  it('should be able to hold an array of all data', function() {
    expect(agency.allData).to.be.an('array');
    expect(agency.allData).to.deep.equal(data)

    expect(agency.allData).to.be.an('array');
    expect(agency.allData[0]).to.deep.equal(data[0])

    expect(agency.allData).to.be.an('array');
    expect(agency.allData[1]).to.deep.equal(data[1])

    expect(agency.allData).to.be.an('array');
    expect(agency.allData[2]).to.deep.equal(data[2])
  });

  it('should return an error message if any data passed in is not an array', function() {
    agency = new Agency([travelers, destinations, 'trips'])
    expect(agency.allData[0]).to.be.an('array');
    expect(agency.allData[1]).to.be.an('array');
    expect(agency.allData[2]).to.equal('Sorry, no trips data could be found at this time!');
  });

  it('should return an error message if any data passed in is not an array', function() {
    agency = new Agency('data')
    expect(agency.allData).to.equal('Sorry, no data could be found at this time');
  });

  it('should be able to return all information relative to a user, by userID', function() {
    expect(agency.findTraveler(1)).to.deep.equal(
      {  
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer"
      });

    expect(agency.findTravelerTrips(1)).to.deep.equal([
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
    expect(agency.findTraveler('hat')).to.equal('Sorry, invalid userID!')
  });

  it('should return an error message if no data can be found relative to user', function() {
    expect(agency.findTraveler(84)).to.equal('Sorry, invalid userID!')
    expect(agency.findTravelerTrips(1043)).to.equal('Sorry, invalid userID!')
  });

  it('should be able to sort trips by date', function() {
    expect(agency.sortTripsByDate()[0]).to.deep.equal({
      "id": 27,
      "userID": 3,
      "destinationID": 7,
      "travelers": 6,
      "date": "2019/07/16",
      "duration": 5,
      "status": "approved",
      "suggestedActivities": []
    });

    expect(agency.sortTripsByDate()[1]).to.deep.equal({
      "id": 19,
      "userID": 7,
      "destinationID": 47,
      "travelers": 4,
      "date": "2019/07/21",
      "duration": 5,
      "status": "approved",
      "suggestedActivities": []
    })
  });

  it.skip('should be able to return all pending trips', function() {
    expect(agency.returnAllPendingTrips()).to.deep.equal(
      [{
        "id": 2,
        "userID": 13,
        "destinationID": 25,
        "travelers": 5,
        "date": "2020/10/04",
        "duration": 18,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 3,
        "userID": 12,
        "destinationID": 22,
        "travelers": 4,
        "date": "2020/05/22",
        "duration": 17,
        "status": "pending",
        "suggestedActivities": []
      },
      {
        "id": 22,
        "userID": 12,
        "destinationID": 9,
        "travelers": 4,
        "date": "2020/05/01",
        "duration": 19,
        "status": "pending",
        "suggestedActivities": []
      }])
  });

  it.skip('should be able to approve or deny any user\'s trip, based on trip id', function() {
    // opportunuty to use spies
    // needs to spy on whatever click event in the document wiil call this function
    expect(agency.approveOrDenyTripRequest(3)).to.be.a('function')
    expect(agency.allData[1][2]).to.deep.equal({
      "id": 3,
      "userID": 12,
      "destinationID": 22,
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    })

    expect(dataRepository.allData[1][2]).to.deep.equal({
      "id": 3,
      "userID": 12,
      "destinationID": 22,
      "travelers": 4,
      "date": "2020/05/22",
      "duration": 17,
      "status": "approved",
      "suggestedActivities": []
    })
  });

  it.skip('should return an error message if invalid trip id is passed in', function() {
    expect(agency.approveOrDenyTripRequest('hat')).to.equal('Sorry, invalid trip!')
  });

  it.skip('should return an error message if trip id is valid, but cannot be found', function() {
    expect(agency.approveOrDenyTripRequest(1000)).to.equal('Sorry, trip #1000 cannot be found!')
  });
});

  
