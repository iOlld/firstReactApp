import React from 'react';
import OutData from './OutData/OutData';
import './Weather.scss';
// import EnterCityName from './EnterCityName/EnterCityName';

class Weather extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        apiKey: 'ca482b786e08726f3f706f8816f39a3b',
        data: '',
        degreesCelsius: 273.15,
        city: '',
        country: '',
        cityName: 'Kiev,ua',
        activeBorder: '',
        temp: '',
      }

      this.coordFunc();
      
    }

    
    // старт погоды
    weatherNow = (how) => {

        fetch(`https://api.openweathermap.org/data/2.5/weather?${how}&appid=${this.state.apiKey}&lang=ru`)
        // fetch(`https://api.openweathermap.org/data/2.5/weather?id=703448&${this.state.apiKey}&lang=ru`)
            .then( (data) => {
                return data.json()
            } )
            .then( (data) => {
                // let result = {}
                this.setState({data: data})
                this.setState({city: data.name})
                this.setState({country: data.sys.country})
                this.showAllData();
            } )
            .catch( () => {
                // errror
            } )

    }

    // при вводе смена css стиля
    addBorderStyle = () => {
        this.setState({activeBorder: 'active__border'})
    }

    // Отправка формы (введенных значений в инпут)
    sendForm = (event) => {
        event.preventDefault();
        this.weatherNow(`q=${this.state.cityName}`)
        this.setState({activeBorder: ''})
    }

    // Определение координат
    coordFunc = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setCoordFunk(position.coords.latitude, position.coords.longitude);
            }, (error) => {
            // если ошибка (можно проверить код ошибки)
            if (error.PERMISSION_DENIED) {
                this.setState({city: 'Погода по координатам не доступна'})
            }   
        });
        this.setCoordFunk = (lat, long) => {
            this.weatherNow(`lat=${lat}&lon=${long}`)
        }

    }


    // все данные
    showAllData = () => {
        console.log(this.state.data);
        // console.log(this.state.data.rain);
        // console.log(this.state.data.snow);
        // console.log(this.state.data.rain['1h']);
        // console.log(this.state.data.snow['2h']);
        // console.log(this.state.data.rain['3h']);
        // console.log(this.state.data.snow['3h']);
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

            // e.target.value = e.target.value.replace(/\s/g, '')
            // this.setState({cityName: e.target.value.replace(/\s/g, '')})
        }
    }



    render() {

        return (
            <div className="Weather">
                <div className="container">
                    <div className="Weather__wrap">
                        {this.state.city && <p className="city__name" > {this.state.city} {this.state.country} </p>}
                        
                        <form className={[`Weather__input ${this.state.activeBorder}`]}> 
                            <input onChange={this.cityNameFunc} onClick={this.addBorderStyle} placeholder="Kiev,UA" />
                            <div className="btn__wrap" >
                                <button onClick={this.sendForm} >GO</button>
                            </div>
                        </form>

                        {/* Тут мы данные выводим если пользователь не накосячит */}
                        {(this.state.data.cod === 200)?(<OutData 
                                                            data={this.state.data} 
                                                            degreesCelsius={this.state.degreesCelsius} />)
                                                            :<p>И шо теперь делать?</p>}

                    </div>
                </div>

            </div>
        )
    }   
}

export default Weather;