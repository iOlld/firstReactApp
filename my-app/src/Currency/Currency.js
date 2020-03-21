import React from 'react';
import './Currency.scss';
import CurrencyCalc from './CurrencyCalc/CurrencyCalc';

class Currency extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        data: '',
        dataOther: '',
        dataAll: '',
        allCurrencyCod: '',
        result: '',
        selectDefaultVal: '',
        selectChecked: '',
      }

      this.baseCyrrency = ['EUR', 'USD', 'RUR'];

      this.currency();
    }
    // 3 основные валюты которые дает банк и они влепили туда биткоин
    currency = () => {

        fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)

            .then( data => data.json() )

            .then( (data) => {
                this.setState({data: data});
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

            .then( (data) => this.glueArrays(this.state.data, data) )

    }

    
    // склеиваем 2 массива
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

    // переберает массив всех валют и выводит данные о выбранной валюте
    selectFunc = (event) => {
        let res = this.state.dataAll.filter( element => event.target.value === element.ccy);

        this.setState({selectChecked: res});
    }
    
    render() {

        console.log(this.state.selectChecked)
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
                        
                        <div className="sylect__currency-wrap">
                            
                            <p>Калькулятор валют</p>
                            <select onChange={this.selectFunc} className="select__currency" defaultValue={this.state.selectDefaultVal} name="select">
                                <option value="" disabled>Выберите валюту</option>
                                {Object.keys(this.state.allCurrencyCod).map( (element) => {
                                    return <option key={element} value={this.state.allCurrencyCod[element]} >{this.state.allCurrencyCod[element]}</option>
                                } )}
                            </select>
                            {this.state.selectChecked && < CurrencyCalc selectChecked={this.state.selectChecked} />}
                            {/* {this.state.selectChecked && <p>
                                {parseFloat(this.state.selectChecked[0].buy)}&nbsp;&nbsp;
                                {this.state.selectChecked[0].ccy}&nbsp;&nbsp;
                                {parseFloat(this.state.selectChecked[0].sale)}
                            </p> } */}
                        </div>

                    </div>
                    {/* < CurrencyCalc selectChecked={this.state.selectChecked} /> */}
                </div>
            </div>
        )
    }   
}

export default Currency;