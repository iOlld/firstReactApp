import React from 'react';
import './Weather.scss';

import OutData from './OutData/OutData';
import FiveDay from './FiveDay/FiveDay';

class Weather extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        apiKey: 'ca482b786e08726f3f706f8816f39a3b',
        data: {},
        forecastData: {},
        degreesCelsius: 273.15,
        city: '',
        select: '',
        selectCountry: '',
        selectCity: '',
        cityName: 'Kiev,ua',
        activeBorder: '',
      }

      // Список городов
        this.cityList = [
            
            {
                "id": 707860,
                "name": "Hurzuf",
                "country": "UA",
                "coord": {
                    "lon": 34.283333,
                    "lat": 44.549999
                }
            },

            {
                "id": 519188,
                "name": "Novinki",
                "country": "RU",
                "coord": {
                    "lon": 37.666668,
                    "lat": 55.683334
                }
            },

            {
                "id": 571476,
                "name": "Bryansk",
                "country": "RU",
                "coord": {
                    "lon": 34.38,
                    "lat": 53.29
                }
            },

            {
                "id": 553915,
                "name": "Kaluga",
                "country": "RU",
                "coord": {
                    "lon": 36.2754,
                    "lat": 54.5293
                }
            },

            {
                "id": 708546,
                "name": "Holubynka",
                "country": "UA",
                "coord": {
                    "lon": 33.900002,
                    "lat": 44.599998
                }
            },

            {
                "id": 703363,
                "name": "Laspi",
                "country": "UA",
                "coord": {
                "lon": 33.733334,
                "lat": 44.416668
                }
            },

            {
                "id": 473537,
                "name": "Vinogradovo",
                "country": "RU",
                "coord": {
                    "lon": 38.545555,
                    "lat": 55.423332
                }
            },

            {
                "id": 569143,
                "name": "Cherkizovo",
                "country": "RU",
                "coord": {
                    "lon": 37.728889,
                    "lat": 55.800835
                }
            },

            {
                "id": 705135,
                "name": "Konotop",
                "country": "UA",
                "coord": {
                    "lon": 33.2,
                    "lat": 51.24
                }
            },

            {
                "id": 713514,
                "name": "Alupka",
                "country": "UA",
                "coord": {
                    "lon": 34.049999,
                    "lat": 44.416668
                }
            }

        ];

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
            .then( data => data.json() )
            .then( (data) => {
                this.setState({data: data})
                this.setState({city: data.name})
            } )
            
    }


    // // Пять дней
    weatherForecast = (cityId) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?${cityId}&appid=${this.state.apiKey}&lang=ru`)
        .then( data => data.json() )
        .then( (data) => {
            this.setState({forecastData: data})
        } )
    }


    // название места/города
    // придумать как корректно вводить название городов из 2-х и больше слов
    cityNameFunc = (e) => {
        e.target.value === '' ? this.setState({cityName: 'Kiev,ua'}) : this.setState({cityName: e.target.value})
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

    // выбор страны
    selectCountry = (event) => {
        this.setState({select: event.target.value})
    }
    // выбор города
    selectCity = (event) => {
        this.weatherNow(`id=${event.target.value}`)
        this.weatherForecast(`id=${event.target.value}`)
    }


    render() {

        // фильтр повторяющихся стран
        let country = this.cityList.map( element => element.country );
        let countrySet = new Set(country);
        countrySet = Array.from(countrySet)

        return (
            <div className="Weather">
                <div className="Weather__bg"></div>
                <div className="container">
                    <div className="Weather__wrap">
                        <div className="Weather__head">
                            {this.state.city && <p className="city__name" > {this.state.city}</p>}
                        </div>
                        
                        <form className={[`Weather__input ${this.state.activeBorder}`]}> 
                            <input onChange={this.cityNameFunc} onClick={this.addBorderStyle} placeholder="Kiev,UA" />
                            <div className="btn__wrap" >
                                <button onClick={this.sendForm} >GO</button>
                            </div>
                        </form>
                        {/* Это вот мама просила сделать выбор городов */}
                        <div className="Weather__select" >
                            <select onChange={this.selectCountry} className="select__currency" defaultValue={this.state.selectCountry} name="select">
                                <option value="" disabled>Выберите страну</option>
                                {Object.keys(countrySet).map( (element, i) => {
                                    return <option key={i} value={countrySet[element]} >{countrySet[element]}</option>
                                } )}
                            </select>
                            {this.state.select && (
                                <select onChange={this.selectCity} className="select__currency" defaultValue={this.state.selectCity} name="select">
                                    <option value="" disabled>Выберите город</option>
                                    {Object.keys(this.cityList).map( (element, i) => {

                                        if(this.state.select.indexOf(this.cityList[element].country) !== -1) {
                                            return <option key={i} value={this.cityList[element].id} >{this.cityList[element].name}</option>
                                        } else{
                                            return null
                                        }

                                    } )}
                                </select>
                            )}
                        </div>

                        {/* Тут мы данные выводим если пользователь не накосячит (текущие) */}
                        {(this.state.data.cod === 200)?(<OutData 
                                                            data={this.state.data} 
                                                            degreesCelsius={this.state.degreesCelsius} />)
                                                            :<p>Что-то пошло не так</p>}
                                                            

                        {/* Тут, если все норм, то данные о погоде на 5 дней с шагом в 3 часа*/}
                        {(this.state.forecastData.cod === '200')?(<FiveDay 
                                                            forecastData={this.state.forecastData}
                                                            degreesCelsius={this.state.degreesCelsius} />)
                                                            :<p>Что-то пошло не так два раза</p>}

                    </div>
                </div>

            </div>
        )
    }   
}

export default Weather;