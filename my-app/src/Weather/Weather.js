import React from 'react';
import './Weather.scss';

import OutData from './OutData/OutData';
import FiveDay from './FiveDay/FiveDay';
// import EnterCityName from './EnterCityName/EnterCityName';

class Weather extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        apiKey: 'ca482b786e08726f3f706f8816f39a3b',
        data: {},
        forecastData: {},
        sunrise: '',
        sunset: '',
        timezone: '',
        degreesCelsius: 273.15,
        city: '',
        country: '',
        cityName: 'Kiev,ua',
        activeBorder: '',
        temp: '',
      }

      this.coordFunc();
      
    }

    
    // Определение координат изначально
    coordFunc = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setCoordFunk(position.coords.latitude, position.coords.longitude);
            }, (error) => {
            // если ошибка (можно проверить код ошибки)
            if (error.PERMISSION_DENIED) {
                this.weatherNow(`q=${this.state.cityName}`)
                this.weatherForecast(`q=${this.state.cityName}`)
                // this.setState({city: 'Погода по координатам не доступна'})
            }   
        });
        this.setCoordFunk = (lat, long) => {
            this.weatherNow(`lat=${lat}&lon=${long}`)
            this.weatherForecast(`lat=${lat}&lon=${long}`)
        }

    }

    
    // Сейчас погода
    weatherNow = (how) => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?${how}&appid=${this.state.apiKey}&lang=ru`)
            .then( (data) => {
                return data.json()
            } )
            .then( (data) => {
                this.setState({data: data})
                this.setState({city: data.name})
                this.setState({country: data.sys.country})
                this.setState({sunrise: data.sys.sunrise})
                this.setState({sunset: data.sys.sunset})
                this.setState({timezone: data.timezone})
                // this.setState({cityId: data.id})

                // this.weatherForecast(`id=${data.id}`);



                // this.showAllData();


            } )
            .catch( () => {
                // errror
            } )

    }


    

    // // Пять дней
    weatherForecast = (cityId) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?${cityId}&appid=${this.state.apiKey}&lang=ru`)
        .then( (data) => {
            return data.json()
        } )
        .then( (data) => {
            this.setState({forecastData: data})
            // this.five();
        } )
        .catch( () => {
            // errror
        } )
    }


    // название места/города
    // придумать как корректно вводить название городов из 2-х и больше слов
    cityNameFunc = (e) => {
        if(e.target.value === '') {
            this.setState({cityName: 'Kiev,ua'})
        } else {
            // e.target.value = e.target.value.trim()
            this.setState({cityName: e.target.value})

            // e.target.value = e.target.value.trim()
            // this.setState({cityName: e.target.value.trim()})
        }
    }

    // Отправка формы (введенных значений в инпут)
    sendForm = (event) => {
        event.preventDefault();
        this.weatherNow(`q=${this.state.cityName}`)
        this.weatherForecast(`q=${this.state.cityName}`)
        this.setState({activeBorder: ''})
    }



    // при вводе смена css стиля
    addBorderStyle = () => {
        this.setState({activeBorder: 'active__border'})
    }


    // Функция вывода времени восхода и захода
    upAndDown = (time) => {
        time = new Date(time * 1000);
        let hoursS = time.getUTCHours();
        let minutesS = time.getUTCMinutes();
        if (hoursS < 10) {
            hoursS = `0${hoursS}`;
        }
        if (minutesS < 10) {
            minutesS = `0${minutesS}`;
        }
        return `${hoursS}:${minutesS}`;
    };



    // five = () => {
    //     console.log(this.state.forecastData);
    //     console.log(this.state.forecastData.cod, typeof(this.state.forecastData.cod));
    // }


    // // // все данные
    // showAllData = () => {
    //     console.log(this.state.data);
    //     console.log(this.state.data.sys.sunrise);
    //     console.log(this.state.data.cod, typeof(this.state.data.cod));
    // }



    render() {

        return (
            <div className="Weather">
                <div className="container">
                    <div className="Weather__wrap">
                        <div className="Weather__head">
                            {this.state.sunrise && <p>Восход {this.upAndDown(this.state.sunrise + this.state.timezone)} </p>}
                            {this.state.city && <p className="city__name" > {this.state.city} {this.state.country} </p>}
                            
                            {this.state.sunset && <p>Заход {this.upAndDown(this.state.sunset + this.state.timezone)} </p>}
                        </div>
                        
                        <form className={[`Weather__input ${this.state.activeBorder}`]}> 
                            <input onChange={this.cityNameFunc} onClick={this.addBorderStyle} placeholder="Kiev,UA" />
                            <div className="btn__wrap" >
                                <button onClick={this.sendForm} >GO</button>
                            </div>
                        </form>

                        {/* Тут мы данные выводим если пользователь не накосячит (текущие) */}
                        {(this.state.data.cod === 200)?(<OutData 
                                                            data={this.state.data} 
                                                            degreesCelsius={this.state.degreesCelsius} />)
                                                            :<p>И шо теперь делать?</p>}
                                                            

                        {/* Тут, если все норм, то данные о погоде на 5 дней с шагом в 3 часа*/}
                        {(this.state.forecastData.cod === '200')?(<FiveDay 
                                                            forecastData={this.state.forecastData}
                                                            degreesCelsius={this.state.degreesCelsius} />)
                                                            :<p>Что-то пошло не так</p>}

                    </div>
                </div>

            </div>
        )
    }   
}

export default Weather;