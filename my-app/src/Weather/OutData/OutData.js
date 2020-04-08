import React from 'react';
import './OutData.scss';

class OutData extends React.Component {
    constructor (props) {
        super(props);
        this.state = {

        }

    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.data,
            degreesCelsius: props.degreesCelsius
        }
    }

    
    // Функция вывода времени восхода и захода
    upAndDown = (time) => {
        time = new Date(time * 1000);
        let hoursS = time.getUTCHours();
        let minutesS = time.getUTCMinutes();
        if (hoursS < 10) hoursS = `0${hoursS}`;
        if (minutesS < 10) minutesS = `0${minutesS}`;
        return `${hoursS}:${minutesS}`;
    };

    // Объяснение скорости ветра 
    windSpeed = () => {
        
        const windSpeedArr = [
            {name: 'Штиль', value: 0.2},
            {name: 'Тихий ветер', value: 1.5},
            {name: 'Лёгкий ветер', value: 3.3},
            {name: 'Слабый ветер', value: 5.4},
            {name: 'Умеренный ветер', value: 7.9},
            {name: 'Свежий ветер', value: 10.7},
            {name: 'Сильный ветер', value: 13.8},
            {name: 'Крепкий ветер', value: 17.1},
            {name: 'Очень крепкий ветер', value: 20.7},
            {name: 'Шторм', value: 24.4},
            {name: 'Сильный шторм', value: 28.4},
            {name: 'Жестокий шторм', value: 32.6},
            {name: 'Ураган', value: 33},
            {name: 'Ураган, точно?', value: 1000},
        ]

        let wind = windSpeedArr.filter( element => this.state.data.wind.speed <= element.value )
        
        return wind[0].name;
    }

    // Направление ветра 
    windDeg = () => {

        const windDegArr = [
            {name: 'Север', valueMin: 0, valueMax: 11.24},
            {name: 'Северо-северо-восток', valueMin: 11.25, valueMax: 33.75},
            {name: 'Северо-восток', valueMin: 33.76, valueMax: 56.26},
            {name: 'Востоко-северо-восток', valueMin: 56.27, valueMax: 78.77},
            {name: 'Восток', valueMin: 78.78, valueMax: 101.28},
            {name: 'Востоко-юго-восток', valueMin: 101.29, valueMax: 123.79},
            {name: 'Юго-восток', valueMin: 123.8, valueMax: 146.3},
            {name: 'Юго-юго-восток', valueMin: 146.4, valueMax: 168.9},
            {name: 'Юг', valueMin: 169, valueMax: 191.5},
            {name: 'Юго-юго-запад', valueMin: 191.6, valueMax: 214.1},
            {name: 'Юго-запад', valueMin: 214.2, valueMax: 236.7},
            {name: 'Западо-юго-запад', valueMin: 236.8, valueMax: 259.3},
            {name: 'Запад', valueMin: 259.4, valueMax: 281.9},
            {name: 'Западо-северо-запад', valueMin: 282, valueMax: 304.5},
            {name: 'Северо-запад', valueMin: 304.6, valueMax: 327.1},
            {name: 'Северо-северо-запад', valueMin: 327.2, valueMax: 349.7},
            {name: 'Север', valueMin: 349.8, valueMax: 360},
        ];

        
        let wind = windDegArr.filter( element => this.state.data.wind.deg >= element.valueMin && this.state.data.wind.deg <= element.valueMax )
        
        return wind[0].name;

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
                        <p>{this.state.data.name} {this.state.data.sys.country}</p>
                        <p>Восход {this.upAndDown(this.state.data.sys.sunrise + this.state.data.timezone)} </p>
                        <p>Восход {this.upAndDown(this.state.data.sys.sunset + this.state.data.timezone)} </p>
                    </div>
                    <div className="description-item">
                        <p>Ощущается как {(this.state.data.main.feels_like - this.state.degreesCelsius).toFixed(2)} &deg;C</p>
                        <p>Минимальная {(this.state.data.main.temp_min - this.state.degreesCelsius).toFixed(2)} &deg;C</p>
                        <p>Максимальная {(this.state.data.main.temp_max - this.state.degreesCelsius).toFixed(2)} &deg;C</p>

                        {this.state.data.visibility && <p>Видимость {this.state.data.visibility / 1000} км</p>}
                        {this.state.data.clouds.all !== 0 && <p>Облачность {this.state.data.clouds.all} % </p>}
                        {this.state.data.main.humidity !== 0 && <p>Влажность {this.state.data.main.humidity} % </p>}
                        {this.state.data.rain && <p> Осадки {this.state.data.rain['3h']} мм </p>}
                        {this.state.data.snow && <p> Осадки {this.state.data.snow['3h']} мм </p>}
                    </div>
                    <div className="description-item">
                        <p>Давление {this.state.data.main.pressure} мм.р.с </p>
                        {this.state.data.wind.speed !== 0 && <p> {this.windSpeed()} {this.state.data.wind.speed} м/с </p>}
                        {this.state.data.wind.deg && <p>Направление {this.state.data.wind.deg}&deg;</p>}
                        {this.state.data.wind.deg && <p>{this.windDeg()} </p>}
                    </div>
                </div>

            </div>
        )
    }   
}

export default OutData;