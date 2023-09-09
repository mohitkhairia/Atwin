const mongoose = require('mongoose');
const Athlete = require('../db/Athlete.model');


async function fetchAthlete({count, page}){
    const skip = (page -1 )* count;

        const AthleteData = await Athlete.find().limit(count).skip(skip);

       const documentCount = await Athlete.countDocuments()
       const data = {AthleteData, documentCount}
        return data;
}

async function addAthlete(athlete, {Score1,Score2,Score3}){
 
    try{
    
    
      let AthleteData = await Athlete.create({
         Athlete: athlete, 
         Score: {
          Score1,
        Score2,
        Score3
        },
         completed: false,
      });
      return AthleteData;
    }
    catch(err){
        console.log(err)
    }
 }

 async function updateAthlete(id, Score, done) {
    const AthleteData = await Athlete.findOne({_id: id}); 
  
    if (!AthleteData) {
      throw new Error('Athlete does not exist');
    }
  
    const updatedAthlete = await Athlete.updateOne({ _id: id }, {Score: Score, completed: done}); 
  
    return updatedAthlete; 
  }
  
  async function deleteAthlete(id) {
    const AthleteData = await Athlete.findOne({ _id: id }); 
  
    if (!AthleteData) {
      throw new Error('Athlete does not exist');
    }
  
    const query = { _id: id }; 
    const deletedAthlete = await Athlete.deleteOne(query);
  
    return deletedAthlete;
  }


 module.exports = {
    fetchAthlete,
    addAthlete,
    updateAthlete,
    deleteAthlete,
}