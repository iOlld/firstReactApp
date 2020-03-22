import React from 'react';
import './CurrencyCalc.scss';

class CurrencyCalc extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        selectDefaultVal: '',
        selectChecked: '',
        inputBuyVal: '',
        inputSaleVal: '',
        buy: 0,
        sale: 0,
      }

    }


    static getDerivedStateFromProps(props, state) {
        return {
            allCurrencyCod: props.allCurrencyCod,
            dataAll: props.dataAll,
        }
    }

    
    // переберает массив всех валют и выводит данные о выбранной валюте
    selectFunc = (event) => {
        let res = this.state.dataAll.filter( element => event.target.value === element.ccy);
        this.setState({selectChecked: res});
        this.reset()
    }
    // купить у банка
    buyFunc = (event) => {
        let summ = event.target.value * this.state.selectChecked[0].sale
        this.setState({sale: summ.toFixed(2)})
        this.setState({inputBuyVal: event.target.value});
    }
    // продать банку(банку чего?)
    saleFunc = (event) => {
        let summ = event.target.value * this.state.selectChecked[0].buy
        this.setState({buy: summ.toFixed(2)})
        this.setState({inputSaleVal: event.target.value});
    }
    // сбросить state
    reset = () => {
        this.setState({buy: 0});
        this.setState({sale: 0});
        this.setState({inputBuyVal: ''});
        this.setState({inputSaleVal: ''});
    }
    
    render() {

        return (
            <div className="CurrencyCalc">

                <div className="sylect__currency-wrap">
                    
                    <p>Калькулятор валют</p>
                    <select onChange={this.selectFunc} className="select__currency" defaultValue={this.state.selectDefaultVal} name="select">
                        <option value="" disabled>Выберите валюту</option>
                        {Object.keys(this.state.allCurrencyCod).map( (element) => {
                            return <option key={element} value={this.state.allCurrencyCod[element]} >{this.state.allCurrencyCod[element]}</option>
                        } )}
                    </select>
                </div>

                {this.state.selectChecked && <div className="CurrencyCalc__item">
                    <p>Купить&nbsp;&nbsp;{this.state.selectChecked[0].ccy}</p>
                    <input type="number" 
                            value={this.state.inputBuyVal}
                            onChange={this.buyFunc}
                            placeholder={[`0 ${this.state.selectChecked[0].ccy}`]} />
                    <p>{this.state.sale}&nbsp;&nbsp;{this.state.selectChecked[0].base_ccy}</p>
                </div>}

                {this.state.selectChecked && <div className="CurrencyCalc__item">
                    <p>Продать&nbsp;&nbsp;{this.state.selectChecked[0].ccy}</p>
                    <input type="number"
                            value={this.state.inputSaleVal}
                            onChange={this.saleFunc}
                            placeholder={[`0 ${this.state.selectChecked[0].ccy}`]} />
                    <p>{this.state.buy}&nbsp;&nbsp;{this.state.selectChecked[0].base_ccy}</p>
                </div>}
            </div>
        )
    }   
}

export default CurrencyCalc;