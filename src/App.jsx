import { useReducer, useState } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import './App.css'
import BarChart from './BarChart'
Chart.register(CategoryScale);

function App() {
  const [player1Data, setPlayer1Data] = useState({})
  const [player2Data, setPlayer2Data] = useState({})
  const [currentData, setCurrentData] = useState({})
  const [showChart1, toggleChart1] = useState(false)
  const [showChart2, toggleChart2] = useState(false)


  async function fetchData(){
    let data = await fetch('http://localhost:1337')
    return data.json()
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const data = new FormData(e.target);
    let formObject = Object.fromEntries(data.entries());
    let players = await fetchData();
    let searchedPlayer;
    for(let player of players){
      let firstnameBool = player.Name.toLowerCase().indexOf(formObject.firstname.toLowerCase()) > -1 || player.LongName.toLowerCase().indexOf(formObject.firstname.toLowerCase()) > -1
      let lastnameBool = player.Name.toLowerCase().indexOf(formObject.lastname.toLowerCase()) > -1 || player.LongName.toLowerCase().indexOf(formObject.lastname.toLowerCase()) > -1
      if(firstnameBool && lastnameBool) {
        searchedPlayer = Object.assign({}, player)
        let dataBar = {};
          let data = []
          dataBar['labels'] = Object.keys(searchedPlayer).filter(i =>
            searchedPlayer[i] > 5 && searchedPlayer[i] < 100
          )
          data = dataBar['labels'].map(i => searchedPlayer[i])
          dataBar['datasets'] = [
            {
              label: searchedPlayer.Name,
              backgroundColor:'' /*'#EC932F'*/,
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: data
            }
          ];
          dataBar['name'] = searchedPlayer.Name
          console.log(dataBar)
        if(e.target.parentNode.className == 'player 1'){
          setPlayer1Data(dataBar)
          toggleChart1(true)
        }
        else{
          setPlayer2Data(dataBar)
          toggleChart2(true)
        }
        return;
      }
    }
    
  }

  return(
    <div className="App">
      <h1>Analysis From FIFA 21 DATA</h1>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        {
          ['player 1', 'player 2']
          .map(item =>(
            <div key={item} className = {item}>
              <h2 style={{margin:'10px'}}>{item}</h2>
              <form  style={{display:'flex', flexFlow:'column nowrap', alignItems:'center'}} onSubmit={handleSubmit}>
                <label style={{margin:'10px'}} >
                  lastName:
                  <input type="text" name='lastname' style={{marginLeft:'20px'}}/>
                </label>
                <label >
                    firstName: 
                    <input type="text" name='firstname' style={{marginLeft:'20px'}}/>
                  </label>
                  <button  type='submit' style={{width:120, margin:15}}>Search</button>
              </form>
              {
                item == 'player 1'?
                showChart1 && <BarChart data={player1Data}/>:
                showChart2 && <BarChart data={player2Data}/>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
  
}

export default App