import React from 'react';
import './Weather.scss';

import OutData from './OutData/OutData';
import FiveDay from './FiveDay/FiveDay';
import ParalaxWeather from './ParalaxWeather/ParalaxWeather';
import SelectWeather from './SelectWeather/SelectWeather';
import IsLoading from '../IsLoading/IsLoading';

class Weather extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            apiKey: 'ca482b786e08726f3f706f8816f39a3b',
            data: {},
            forecastData: {},
            degreesCelsius: 273.15,
            city: '',
            cityName: 'Kiev,ua',
            activeBorder: '',
            contentHeight: '', // стейт для ParalaxWeather
            weatherForecastState: '',
            weatherNowState: '',
        }

        this.content = React.createRef()

        this.coordFunc();
        
    }

    componentDidMount() {
        this.setState({contentHeight: this.content.current.offsetHeight})
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

    render() {

        return (
            <div className="Weather">
                <div className="Weather__wrap">

                    <ParalaxWeather contentHeight={this.state.contentHeight} />

                    <div className="Weather__content" ref={this.content}>
                        <div className="Weather__content-wrap">
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
                            <SelectWeather weatherNow={this.weatherNow}
                                            weatherForecast={this.weatherForecast} />

                            {/* Тут мы данные выводим если пользователь не накосячит (текущие) */}
                            {(this.state.data.cod === 200)?(<OutData 
                                                                data={this.state.data} 
                                                                degreesCelsius={this.state.degreesCelsius} />)
                                                                :<IsLoading />}
                                                                

                            {/* Тут, если все норм, то данные о погоде на 5 дней с шагом в 3 часа*/}
                            {(this.state.forecastData.cod === '200')?(<FiveDay 
                                                                forecastData={this.state.forecastData}
                                                                degreesCelsius={this.state.degreesCelsius} />)
                                                                :<IsLoading />}

                        </div>
                    </div>
                </div>
            </div>
        )
    }   
}

export default Weather;