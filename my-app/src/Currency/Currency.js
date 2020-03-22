import React from 'react';
import './Currency.scss';
import CurrencyCalc from './CurrencyCalc/CurrencyCalc';

class Currency extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        dataBase: '',
        dataAll: '',
        allCurrencyCod: '',
        result: '',
      }

      this.baseCyrrency = ['EUR', 'USD', 'RUR'];

      this.currency();
    }
    // 3 основные валюты которые дает банк и они влепили туда биткоин
    currency = () => {

        fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)

            .then( data => data.json() )

            .then( (data) => {
                this.setState({dataBase: data});
                // выводит те валюты которые я выбрал изначально
                let result = data.filter( element => this.baseCyrrency.indexOf(element.ccy) !== -1 )

                this.setState({result: result});
                this.currencyOther();
            } )

    }
    // второстепенные валюты которые дает банк и опять биткоин
    currencyOther = () => {

        fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4`)

            .then( data => data.json() )

            .then( (data) => this.glueArrays(this.state.dataBase, data) )

    }

    
    // // склеиваем 2 массива
    glueArrays = (base, other) => {
        // склеиваем 2 массива
        let all = base.concat(other);
        this.setState({dataAll : all})
        // получаем все коды/обозначения валют
        let cod = all.map( element => element.ccy );
        // убираем повторения кода/обозначения, (эти махинации только для того чтоб убрать повторение биткоина)
        let res = Array.from((new Set(cod)));

        this.setState({allCurrencyCod: res});
    }

    
    render() {

        return (
            <div className="Currency">
                <div className="Currency__bg"></div>
                <div className="container">
                    <div className="Currency__wrap">
                        <p>
                            Курс от "приват банка"
                        </p>

                        <p className="base__currency" >Основные валюты</p>
                        <div className="Currency__item-wrap" >
                            {Object.keys(this.state.result).map( (keyName, i) => {
                                return (
                                    <div className="Currency__item" key={i} >
                                        <p> 
                                            {parseFloat(this.state.result[keyName].buy)}&nbsp;&nbsp;
                                            {this.state.result[keyName].ccy}&nbsp;&nbsp;
                                            {parseFloat(this.state.result[keyName].sale)}
                                        </p>
                                    </div>
                                )
                            } )}
                        </div>

                        {this.state.allCurrencyCod && < CurrencyCalc allCurrencyCod={this.state.allCurrencyCod}
                                                                        dataAll={this.state.dataAll} />}
                        
                    </div>
                </div>
            </div>
        )
    }   
}

export default Currency;