const express = require('express');
const {fetchAthlete, updateAthlete ,deleteAthlete, addAthlete}= require('../controller/Athletes.controller');


const AthleteRoute = express.Router();



AthleteRoute.get('/', async (req,res)=>{
    try{
        let{count =10 , page= 1} = req.query;

        count = parseInt(count);
        page= parseInt(page);
        
        const {AthleteData, documentCount} = await fetchAthlete({
            count, page
        });

        return res.send({
          AthleteData, documentCount
        })
      }
      catch(err){
        console.log(err)

        return res.status(500).send({
            error : 'something went wrong'
        })
      }
})

AthleteRoute.post('/', async (req,res)=>{
  try{

    
    let {Athlete, Score} = req.body;
    // console.log(Score)
    const data = await addAthlete(Athlete, Score);

    return res.send(data)
    }
 catch(err){
      console.log(err)

      return res.status(500).send({
          error : 'something went wrong'
      })
    }
})

AthleteRoute.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id; 
    let {Score, completed} = req.body;
   

    const data = await updateAthlete(id, Score, completed);

    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({
      err: 'something went wrong',
    });
  }
});

AthleteRoute.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id; 

    const data = await deleteAthlete(id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({
      err: 'something went wrong',
    });
  }
});



module.exports = AthleteRoute;