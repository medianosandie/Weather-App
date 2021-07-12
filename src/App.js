
import './App.css';
import React,{useEffect,useState} from 'react';
import API_ID from './ApiID';//this file is not included in this repo


function App() {
  const [weatherData,setWeatherData] = useState({});
  const [mounted,setMounted] = useState(false);
  const [clicked,setClicked] = useState(false);

  if(!mounted){

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=jakarta&units=metric&appid=${API_ID}`)
        .then( res => res.json() )
        .then( resJson => {
          if(resJson.cod === '404'){
            throw new Error(`<div>Please wait...</div>`);
          }
          else{
            setWeatherData(()=>resJson)
            console.log(resJson);
          }
        })
        .then(()=>console.log('components will be mounted'))
        .catch((e)=> setWeatherData(()=>e))
    
  }

  useEffect(()=>{
    setMounted(()=>true)
  },[])

  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=jakarta&units=metric&appid=${API_ID}`)
        .then( res => res.json() )
        .then( resJson => {
          if(resJson.cod === '404'){
            throw new Error(`<div>something went wrong</div>`);
          }
          else{
            setWeatherData(()=>resJson)
            console.log(resJson);
          }
        })
        .then(()=>console.log('components will be mounted'))
        .catch((e)=> setWeatherData(()=>e))
  },[clicked]);



  return (
    <div className="App">
      <Weather weatherData={weatherData} setClicked={setClicked}/>
    </div>
  );
}

const Weather = ({weatherData,setClicked}) => {
  //object.keys.length akan mengembalikan banyak atribut dalam objek
  if(Object.keys(weatherData).length < 4) {
    return (<div>something went wrong</div>);
  }
  else{
    return(
      <React.Fragment>
        <div class="weather">
          <div class="upper-items">
            <div>
              <span class="location">{weatherData.name}</span>
              <span class="description">{weatherData.weather[0].main}</span>
            </div>
            <img src="../assets/rainy.png" alt="rainy"/>
          </div>
          <div class="lower-items">
            <div class="main-temp">
              <h3 class="temp-title">temp</h3>
              <span class="temp">{`${weatherData.main.temp} C`}</span>
            </div>
            <div class="details">
              <h3>details</h3>
              <hr/>
              <div class="detailed-information">
                <div class="right-items">
                  <span>{weatherData.main.temp_max}</span>
                  <span>{weatherData.main.temp_min}</span>
                  <span>{weatherData.main.feels_like}</span>
                </div>
                <div class="left-items">
                  <span>max</span>
                  <span>min</span>
                  <span>feels like</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  
}


export default App;
