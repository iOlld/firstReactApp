import React from 'react';
import './SelectWeather.scss';


class SelectWeather extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            select: '',
            selectCountry: '',
            selectCity: '',
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
                "id": 524901,
                "name": "Moscow",
                "country": "RU",
                "coord": {
                    "lon": 37.62,
                    "lat": 55.75
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

        
    }

    // выбор страны
    selectCountry = (event) => {
        this.setState({select: event.target.value})
        this.setState({selectCity: ''})
    }
    // выбор города
    selectCity = (event) => {
        this.props.weatherNow(`id=${event.target.value}`)
        this.props.weatherForecast(`id=${event.target.value}`)
        this.setState({selectCity: event.target.value})
    }

    render() {

        // фильтр повторяющихся стран
        let country = this.cityList.map( element => element.country );
        let countrySet = new Set(country);
        countrySet = Array.from(countrySet)

        return (
            // {/* Это вот мама просила сделать выбор городов */}
            <div className="SelectWeather" >
                <select onChange={this.selectCountry} className="select__currency" defaultValue={this.state.selectCountry} name="select">
                    <option value="" disabled>Выберите страну</option>
                    {Object.keys(countrySet).map( (element, i) => {
                        return <option key={i} value={countrySet[element]} >{countrySet[element]}</option>
                    } )}
                </select>
                {this.state.select && (
                    <select onChange={this.selectCity} className="select__currency" value={this.state.selectCity} name="select">
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

        )
    }   
}

export default SelectWeather;