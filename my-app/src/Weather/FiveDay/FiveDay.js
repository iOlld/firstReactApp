import React from 'react';
import './FiveDay.scss';

class FiveDay extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        
      }

      
      
    }

    
    static getDerivedStateFromProps(props, state) {
      
      return {
          data: props.forecastData,
          degreesCelsius: props.degreesCelsius,
          
      }
      
    }

    timeFunc = (time) => {
      time = new Date(time * 1000);
      let hours = time.getUTCHours();
      let minutes = time.getUTCMinutes();
      let date = time.getDate();
      let day = time.getDay();
  
      // сделать массивом
      const dayArr = [
        {name: 'Воскресенье', value: 0},
        {name: 'Понедельник', value: 1},
        {name: 'Вторник', value: 2},
        {name: 'Среда', value: 3},
        {name: 'Четверг', value: 4},
        {name: 'Пятница', value: 5},
        {name: 'Суббота', value: 6},
      ];
      
      let dayName = dayArr.filter( element => element.value === day )

      day = dayName[0].name;

      if (hours < 10) hours = `0${hours}`;
      if (minutes < 10) minutes = `0${minutes}`;
      if (date < 10) date = `0${date}`;
  
      return `${date} ${day} ${hours}:${minutes}`;
  };

    

    render() {


        return (
            <div className="FiveDay">
              <p> Прогноз погоды на 5 дней </p>
                <div className="FiveDay__wrap">

                  {Object.keys(this.state.data.list).map( (element, i) => {
                    return (
                      <div className="FiveDay__item" key={i}>
                        
                        <p> {this.timeFunc(this.state.data.list[element].dt)} </p>

                        <div className="FiveDay__item-wrap">
                          <div className="FiveDay__temp-img" >
                            <div>
                              <img src={`https://openweathermap.org/img/wn/${this.state.data.list[element].weather[0].icon}@2x.png`} 
                                  alt={`Погода ${this.state.data.list[element].weather[0].icon}`} />
                            </div>
                              {this.state.data.list[element].weather[0].description && <p>{this.state.data.list[element].weather[0].description}</p>}
                          </div>
                          
                          <div className="FiveDay__temp-description" >
                            <p>{(this.state.data.list[element].main.temp - this.state.degreesCelsius).toFixed(2)} &deg; C</p>
                            <p>Облачность {this.state.data.list[element].clouds.all} %</p>
                            <p>Влажность {this.state.data.list[element].main.humidity} %</p>
                          </div>
                        </div>


                      </div>
                    )
                  } )}
                </div>
            </div>
        )
    }   
}

export default FiveDay;