import React from 'react';
import './OutData.scss';

class OutData extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        //   temp:'',
        // wind: '',
      }


    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.data,
            degreesCelsius: props.degreesCelsius
        }
    }

    windSpeed = () => {
        
        let wind;
        
        if(this.state.data.wind.speed <= 0.2){
            wind = 'Штиль'
        } else if (this.state.data.wind.speed < 1.5){
            wind = 'Тихий ветер'
        } else if (this.state.data.wind.speed < 3.3){
            wind = 'Лёгкий ветер'
        } else if (this.state.data.wind.speed < 5.4){
            wind = 'Слабый ветер'
        } else if (this.state.data.wind.speed < 7.9){
            wind = 'Умеренный ветер'
        } else if (this.state.data.wind.speed < 10.7){
            wind = 'Свежий ветер'
        } else if (this.state.data.wind.speed < 13.8){
            wind = 'Сильный ветер'
        } else if (this.state.data.wind.speed < 17.1){
            wind = 'Крепкий ветер'
        } else if (this.state.data.wind.speed < 20.7){
            wind = 'Очень крепкий ветер'
        } else if (this.state.data.wind.speed < 24.4){
            wind = 'Шторм'
        } else if (this.state.data.wind.speed < 28.4){
            wind = 'Сильный шторм'
        } else if (this.state.data.wind.speed < 32.6){
            wind = 'Жестокий шторм'
        } else if (this.state.data.wind.speed > 33){
            wind = 'Ураган'
        }
        
        return wind;
    }

    windDeg = () => {
        let wind;
        
        if ((this.state.data.wind.deg >= 349.8 && this.state.data.wind.deg <= 360) || (this.state.data.wind.deg >= 0 && this.state.data.wind.deg <= 11.24)) {
            wind = 'Север';
        } else if (this.state.data.wind.deg >= 11.25 && this.state.data.wind.deg <= 33.75) {
            wind = 'Северо-северо-восток';
        } else if (this.state.data.wind.deg >= 33.76 && this.state.data.wind.deg <= 56.26) {
            wind = 'Северо-восток';
        } else if (this.state.data.wind.deg >= 56.27 && this.state.data.wind.deg <= 78.77) {
            wind = 'Востоко-северо-восток';
        } else if (this.state.data.wind.deg >= 78.78 && this.state.data.wind.deg <= 101.28) {
            wind = 'Восток';
        } else if (this.state.data.wind.deg >= 101.29 && this.state.data.wind.deg <= 123.79) {
            wind = 'Востоко-юго-восток';
        } else if (this.state.data.wind.deg >= 123.8 && this.state.data.wind.deg <= 146.3) {
            wind = 'Юго-восток';
        } else if (this.state.data.wind.deg >= 146.4 && this.state.data.wind.deg <= 168.9) {
            wind = 'Юго-юго-восток';
        } else if (this.state.data.wind.deg >= 169 && this.state.data.wind.deg <= 191.5) {
            wind = 'Юг';
        } else if (this.state.data.wind.deg >= 191.6 && this.state.data.wind.deg <= 214.1) {
            wind = 'Юго-юго-запад';
        } else if (this.state.data.wind.deg >= 214.2 && this.state.data.wind.deg <= 236.7) {
            wind = 'Юго-запад';
        } else if (this.state.data.wind.deg >= 236.8 && this.state.data.wind.deg <= 259.3) {
            wind = 'Западо-юго-запад';
        } else if (this.state.data.wind.deg >= 259.4 && this.state.data.wind.deg <= 281.9) {
            wind = 'Запад';
        } else if (this.state.data.wind.deg >= 282 && this.state.data.wind.deg <= 304.5) {
            wind = 'Западо-северо-запад';
        } else if (this.state.data.wind.deg >= 304.6 && this.state.data.wind.deg <= 327.1) {
            wind = 'Северо-запад';
        } else if (this.state.data.wind.deg >= 327.2 && this.state.data.wind.deg <= 349.7) {
            wind = 'Северо-северо-запад';
        }
        
        return wind;
    }

    render() {
        
        return (
            <div className="OutData">
                <div className="now__temp-wrap">
                    <p className="now__temp">{(this.state.data.main.temp - this.state.degreesCelsius).toFixed(2)} &deg;C</p>
                    <div className="now__temp-img" >
                        <img src={`https://openweathermap.org/img/wn/${this.state.data.weather[0].icon}@2x.png`} 
                            alt={`Погода ${this.state.data.name}`} />
                        {this.state.data.weather[0].description && <p> {this.state.data.weather[0].description} </p>}
                    </div>
                </div>

                <div className="description-wrap">
                    <div className="description-item">
                        <p>Ощущается как {(this.state.data.main.feels_like - this.state.degreesCelsius).toFixed(2)} &deg;C</p>
                        <p>Минимальная {(this.state.data.main.temp_min - this.state.degreesCelsius).toFixed(2)} &deg;C</p>
                        <p>Максимальная {(this.state.data.main.temp_max - this.state.degreesCelsius).toFixed(2)} &deg;C</p>
                    </div>
                    <div className="description-item">
                        {this.state.data.visibility && <p>Видимость {this.state.data.visibility / 1000} км</p>}
                        {this.state.data.clouds.all !== 0 && <p>Облачность {this.state.data.clouds.all} % </p>}
                        {this.state.data.main.humidity !== 0 && <p>Влажность {this.state.data.main.humidity} % </p>}
                        {this.state.data.rain && <p> Осадки {this.state.data.rain['3h']} мм </p>}
                        {this.state.data.snow && <p> Осадки {this.state.data.snow['3h']} мм </p>}
                    </div>
                    <div className="description-item">
                        <p>Давление {this.state.data.main.pressure} мм.р.с </p>
                        {/* <p>Скорость ветра {this.state.data.wind.speed} м/с {this.windSpeed()} </p> */}
                        {this.state.data.wind.speed !== 0 && <p> {this.windSpeed()} {this.state.data.wind.speed} м/с </p>}
                        {/* <p>{this.state.data.wind.deg}&deg; {this.windDeg()} </p> */}
                        {/* <p>Направление {this.state.data.wind.deg}&deg; {this.windDeg()} </p> */}
                        <p>Направление {this.state.data.wind.deg}&deg;</p>
                        <p>{this.windDeg()} </p>
                        {/* <p>Направление ветра {this.state.data.wind.deg}&deg; {this.windDeg()} </p> */}
                    </div>
                </div>


            </div>
        )
    }   
}

export default OutData;