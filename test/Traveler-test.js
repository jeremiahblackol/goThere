/* eslint-disable max-len */
const chai = require('chai')
import { expect } from 'chai'
import destinations from '../test-data/destinations-test-data.js'
import trips from '../test-data/trips-test-data.js'
import travelers from '../test-data/travelers-test-data.js'
import DataRepository from '../src/DataRepository.js'
import Traveler from '../src/Traveler.js'


describe('Traveler', function() {

  let traveler;
  let travelerInfo;
  let data;
  let dataRepository;
    
  beforeEach(() => {

    data = [travelers, trips, destinations]
    dataRepository = new DataRepository(data)
    travelerInfo = dataRepository.findTraveler(12)
    traveler = new Traveler(travelerInfo)
           
  })
    
  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });
    
  it('should be an instance of traveler', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });
    
  it('should have an id, name, and traveler type', function() {
    expect(traveler.id).to.equal(12);
    expect(traveler.name).to.equal("Lannie Heynel");
    expect(traveler.travelerType).to.equal("history buff");
  });

  it('should have an array of all traveler trips', function() {
    let traveler2 = new Traveler(dataRepository.findTraveler(6))
    expect(traveler.returnTravelerTrips).to.be.a('function');
    expect(traveler.returnTravelerTrips(dataRepository.trips)).to.deep.equal([
      {
        id: 22,
        userID: 12,
        destinationID: 9,
        travelers: 4,
        date: '2020/05/01',
        duration: 19,
        status: 'pending',
        suggestedActivities: []
      },
      {
        id: 3,
        userID: 12,
        destinationID: 22,
        travelers: 4,
        date: '2020/05/22',
        duration: 17,
        status: 'approved',
        suggestedActivities: []
      }
    ]);

    expect(traveler2.returnTravelerTrips(dataRepository.trips)).to.deep.equal([
      {
        id: 33,
        userID: 6,
        destinationID: 36,
        travelers: 5,
        date: '2020/03/26',
        duration: 19,
        status: 'approved',
        suggestedActivities: []
      }
    ]);
  });

  it('should have an object if traveler has a trip today', function() {
    traveler.returnTravelerTrips(dataRepository.trips)
    expect(traveler.returnCurrentTrip('2020/05/22')).to.deep.equal( {
      id: 3,
      userID: 12,
      destinationID: 22,
      travelers: 4,
      date: '2020/05/22',
      duration: 17,
      status: 'approved',
      suggestedActivities: []
    });

    expect(traveler.returnCurrentTrip(Date.now())).to.equal("Please, use 'YYYY/MM/DD' format");
    expect(traveler.returnCurrentTrip('2029/42/19')).to.equal('Sorry, no trip today')
  });



  it('should return an array of traveler\'s pending trips', function() {
    traveler.returnTravelerTrips(dataRepository.trips)
    expect(traveler.returnPendingTrips()).to.deep.equal([{
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

  it('should be able to return the total a traveler spent on trips', function() {
    traveler.returnTravelerTrips(dataRepository.trips)
    expect(traveler.returnTravelerTotalSpent(dataRepository.destinations)).to.equal(4501.20)
  });
});
    






// ## Iteration 3.1 - Traveler Test
// as a developer I should:


//  - [ ] Write a test that checks that Traveler has three properties
//  - past trips
//  - current trip
//  - future trips
//  - pending trips

//  ## Iteration 3.1 - Traveler Test
//  as a developer I should:
 
//  - [ ] Write a test shows Traveler can calculate total money spent
 
//  - [ ] Write a test that checks that Traveler can request trips
 
 