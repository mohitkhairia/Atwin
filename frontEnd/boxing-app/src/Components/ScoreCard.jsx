
import { useState } from 'react';
import styles from './ScoreCard.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function ScoreCard(props) {
  let [editIndex, setEditIndex] = useState(-1); 
  let [updatedScore1, setUpdatedScore1] = useState(1);
  let [updatedScore2, setUpdatedScore2] = useState(1);
  let [updatedScore3, setUpdatedScore3] = useState(1);
  

  function handleDelete(index, id) {
    const correctedList = props.ScoreCard.filter((ele, i) => i !== index);
    props.onDeleteScoreList(correctedList, id);

  }

  function handleUpdate(id, index) {
  props.ScoreCard.map((ele)=>{
    if(ele._id === id){
      setUpdatedScore1(ele.Score.Score1)
      setUpdatedScore2(ele.Score.Score2)
      setUpdatedScore3(ele.Score.Score3)

    }
  })
    setEditIndex(index);

    // setUpdatedScore1(props.ScoreCard[index].Score);
  }

  function handleInputChange1(event) {
    updatedScore1 = event.target.value;
    updatedScore1 = parseInt(updatedScore1)
    
    setUpdatedScore1(updatedScore1);
  }
  function handleInputChange2(event) {
    updatedScore2 = event.target.value;
    updatedScore2 = parseInt(updatedScore2)
    
    setUpdatedScore2(updatedScore2);
  }
  function handleInputChange3(event) {
    updatedScore3 = event.target.value;
    updatedScore3 = parseInt(updatedScore3)
    
    setUpdatedScore3(updatedScore3);
  }

  function handleUpdateScore(id) {
      // console.log(updatedScore1)

      const updatedScoreList = {
       Score1: updatedScore1,
       Score2: updatedScore2,
       Score3: updatedScore3
      }
      props.onUpdateScoreList(updatedScoreList, id, false);
      setEditIndex(-1); 
    
  }

  function handleDone( id, done){
    // console.log(done)
    const updatedScoreList = {
      Score1: updatedScore1,
      Score2: updatedScore2,
      Score3: updatedScore3
     }
    props.onUpdateScoreList(updatedScoreList, id, done);
  }

  

  return (
    <div className={styles.mainDiv}>
        <div key={'top'} className={styles.outerDiv}>
                <div className={styles.tick}></div>
                <div className={styles.contentDiv}>
                        <h3 className={styles.content}>Athelete's Name</h3>
                        <div>
                        <h3 className={styles.content} >Round One</h3>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h3 className={styles.content} >Round Two</h3>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <h3 className={styles.content} >Round Three</h3>
                        
                        <h3 className={styles.content} >Total Score</h3>
                        </div>
                </div>
                <div><h3 className={styles.content}>Edit</h3></div>
                <div><h3 className={styles.content}>Delete</h3>
                </div>
          </div>

      {props.ScoreCard.map((ele, index) => (
        <div key={index} className={styles.outerDiv} style={{backgroundColor: (ele.completed ? 'lightgreen' : 'white'),}}>
          <div className={styles.tick} onClick={()=> handleDone( ele._id, (ele.completed === true ? false : true) )}>
           {ele.completed ? 
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5MvcCEKsuDSOObeyxN7ZpfSMFOLGHaClMtSwAmY0&s"
              alt="tick"
            /> :
            <div key={index}></div>}
          </div>
          
          {editIndex === index ? (
        <div className={styles.contentDiv}> 
            <p className={styles.content}>{ele.Athlete}</p>
            <div>
            <select value={updatedScore1} onChange={handleInputChange1} className={styles.inputBox}>
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
            <select value={updatedScore2} onChange={handleInputChange2} className={styles.inputBox}>
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
            <select value={updatedScore3} onChange={handleInputChange3} className={styles.inputBox}>
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
            <p className={styles.content} >{ele.Score.Score1+ele.Score.Score2+ele.Score.Score3}</p>

            </div>
            </div>
          ) : (
            <div className={styles.contentDiv}>
            <p className={styles.content}>{ele.Athlete}</p>
            <div>
            <p className={styles.content} >{ele.Score.Score1}</p>
            <p className={styles.content} >{ele.Score.Score2}</p>
            <p className={styles.content} >{ele.Score.Score3}</p>
            <p className={styles.content} >{ele.Score.Score1+ele.Score.Score2+ele.Score.Score3}</p>

            </div>
            </div>
           
          )}
          {editIndex === index ? (
            <div onClick={()=> handleUpdateScore(ele._id)}
            className={styles.updateButton}
            >Update</div>
          ) : (
            <i className="fas fa-pencil-alt"   onClick={() => handleUpdate(ele._id, index)} ></i>
          )}
         
          <i className='fas fa-trash'  onClick={() => handleDelete(index, ele._id)} ></i>
        </div>
      ))}
    </div>
  );
}

export default ScoreCard;