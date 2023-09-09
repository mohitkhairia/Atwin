import styles from './InputBox.module.css'
import Loading from './Loading';
import ScoreCard from './ScoreCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import backgroundImage from '../image/boxing.jpg'; // Replace with the actual path to your image file


function Input(){
  
  
    let [page, setPage] = useState(1);
    let [available, setAvailability] = useState(false);
    let [docCount, setDocCount] = useState(0);
    let [Athlete, setAthlete] = useState("");
    let [Score1, setScore1] = useState(1);
    let [Score2, setScore2] = useState(1);
    let [Score3, setScore3] = useState(1);

    

    let [ScoreList, setScoreList] = useState([]);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    async function addAthlete() {
      try {
        
        // if (todo.trim() !== '') {
          const res = await axios.post('http://localhost:3001/athlete', { Athlete: Athlete, Score: {Score1,Score2,Score3} }, config);
          // Use res.data to access the response data
          console.log(res.data)
        
          // Instead of updating the todoList with "todo", use the response data
          setScoreList([...ScoreList, res.data]);
    
          setAthlete(''); // Reset the todo state after adding the todo
          setScore1(1); // Reset the todo state after adding the todo
          setScore2(1); // Reset the todo state after adding the todo
          setScore3(1); // Reset the todo state after adding the todo

        // }
      } catch (err) {
        console.log(err);
      }
    }
  function updateAthlete(event){
          Athlete = event.target.value;
          setAthlete(Athlete);
  }
  function updateScore1(event){
    Score1 = event.target.value;
    setScore1(Score1);
    }
    function updateScore2(event){
      Score2 = event.target.value;
      setScore2(Score2);
      }
      function updateScore3(event){
        Score3 = event.target.value;
        setScore3(Score3);
        }
 async function updateScoreList(correctedScore, id, done) {
  try {
    console.log(typeof(correctedScore), id)
    await axios.patch(`http://localhost:3001/athlete/${id}`, { Score: correctedScore, completed: done }, config);

    // Find the index of the item being updated in the todoList state
    const itemIndex = ScoreList.findIndex((item) => item._id === id);

    // If the item is found in the todoList state, update only that item
    if (itemIndex !== -1) {
      const updatedScoreList = [...ScoreList];
      updatedScoreList[itemIndex].Score = correctedScore;
      updatedScoreList[itemIndex].completed = done;
      console.log(updatedScoreList)
      setScoreList(updatedScoreList);
    }
  } catch (err) {
    console.log(err);
  }
}
 async function deleteScoreList(correctedList, id){
  try{
   const res = await axios.delete( `http://localhost:3001/athlete/${id}`)
    setScoreList(correctedList);

   }
   catch(err){
    console.log(err);
   }
 }


  function updatePage(value) {
   
    if (page === 1 && value === -1) {
      return alert("You are on First Page");
    } 
    else if (page >= docCount/8 && value === 1) {
      alert("You are on the Last Page");
    } 
    else {
      setPage((preState) => preState + value);
    }
  }

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        let response = await axios.get(
          `http://localhost:3001/athlete?count=9&page=${page}`
        );
       
        let res =  response.data;
        // console.log(res.AthleteData)
        
          setScoreList(res.AthleteData);
          setDocCount(res.documentCount)
        
        setAvailability(true);

      } catch (error) {
        console.log(error)
        setAvailability(false);
      }
    };
    
   
    fetchPageData();
  },[page]);

    return(<div className={`${styles.mainBox} ${styles.backgroundImage}`}>
    
    <div  className = {styles.head}>Atwin Boxing App</div>

    <div className={styles.inputBox}>
        <input type="text" className={styles.input} placeholder='Enter Player Name' onChange={updateAthlete} value={Athlete}/>
        <div className={styles.scores}>
          <p>Enter Scores</p>
        <select value={Score1} onChange={updateScore1} className={styles.input}>
        <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        <select value={Score2} onChange={updateScore2} className={styles.input}>
        <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        <select value={Score3} onChange={updateScore3} className={styles.input}>
        <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
        </div>
        <div onClick={addAthlete} className={styles.addButton}><p>Add Athlete</p></div>

    </div>

    <div className={styles.listBox}>
    {
  available ? <ScoreCard ScoreCard = {ScoreList} onUpdateScoreList = {updateScoreList} onDeleteScoreList = {deleteScoreList} /> : <Loading />
}
    </div>
    <div className={styles.button}>
    <div onClick={() => updatePage(-1)} className={styles.indivisualButton}>Prev</div> 
    <div className={styles.pageNumber}>{page}/{parseInt
    (docCount/8)}</div>
    <div onClick={() => updatePage(1)} className={styles.indivisualButton}>Next</div>

    </div>
    </div>)
}


export default Input;