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
  let dataReopsitory;
  let data;
    
  beforeEach(() => {

    data = [travelers, trips, destinations]
    dataRepository = new DataRepository(data)
    travelerInfo = this.dataRepository.findAllUserInfo(12)
    traveler = new Traveler(travelerInfo)
           
  })
    
  it.skip('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });
    
  it.skip('should be an instance of traveler', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });
    
  it.skip('should have an id, name, and traveler type', function() {
    expect(traveler.id).to.equal(12);
    expect(traveler.name).to.equal("Lannie Heynel");
    expect(traveler.travelerType).to.equal("history buff");
  });

  it.skip('should have an object if traveler has a trip today', function() {
    expect(traveler.returnRurrentTrip(/*current date*/)).to.be.an('object');
    // write a sad path test for what happens if traveler is not traveling on date
    expect(traveler.returnRurrentTrip(/*different date*/)).to.be.a('string');
    // how are we going to pass date in

  });

  it.skip('should return an array of traveler\'s pending trips', function() {
    expect(traveler.returnPendingTrips()).to.deep.equal([{
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

  it.skip('should have an array of traveler\'s past trips', function() {
    expect(traveler.pastTrips).to.be.an('array');
  });

  it.skip('should be able to return traveler\'s total money spent on trips', function() {
    expect(traveler.pastTrips).to.be.an('array');
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
 
 