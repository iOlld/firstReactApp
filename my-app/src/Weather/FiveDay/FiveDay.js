import React from 'react';
import './FiveDay.scss';

class FiveDay extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        // forecastData: '',
        // step: 0,
        // apiKey: 'ca482b786e08726f3f706f8816f39a3b',
        // data: '',
        // degreesCelsius: 273.15,
        // city: '',
        // country: '',
        // cityName: 'Kiev,ua',
        // activeBorder: '',
        // temp: '',
      }

      
      
    }

    
    static getDerivedStateFromProps(props, state) {
      
      return {
          data: props.forecastData,
          degreesCelsius: props.degreesCelsius,
          
      }
      
    }


    // componentDidMount() {

    // }

    
    // все данные
    showAllData = () => {
        console.log(this.state.data);
    }

    render() {

      this.showAllData();

        return (
            <div className="FiveDay">
              <p> Прогноз погоды на 5 дней </p>
                <div className="FiveDay__wrap">

                  {Object.keys(this.state.data.list).map( (element, i) => {
                    return (
                      <div className="FiveDay__item" key={i}>
                        
                        <p>{(this.state.data.list[element].main.temp - this.state.degreesCelsius).toFixed(2)} &deg; C</p>
                        <p>Облачность {this.state.data.list[element].clouds.all} %</p>
                        <p>Влажность {this.state.data.list[element].main.humidity} %</p>
                        <div className="FiveDay__temp-img" >
                            <img src={`https://openweathermap.org/img/wn/${this.state.data.list[element].weather[0].icon}@2x.png`} 
                                alt={`Погода ${this.state.data.list[element].weather[0].icon}`} />
                            {this.state.data.list[element].weather[0].description && <p> {this.state.data.list[element].weather[0].description}</p>}
                        </div>
                        {/* {console.log(this.state.data.list[element])}
                        {console.log(this.state.data.list[i])} */}
                      </div>
                    )
                  } )}
                </div>
            </div>
        )
    }   
}

export default FiveDay;