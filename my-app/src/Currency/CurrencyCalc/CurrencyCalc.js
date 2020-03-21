import React from 'react';
import './CurrencyCalc.scss';

class CurrencyCalc extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
          buy: 0,
          sale: 0,
          
      }

    }


    static getDerivedStateFromProps(props, state) {
        return {
            selectChecked: props.selectChecked,
        }
    }

    buyFunc = (event) => {
        let summ = event.target.value * this.state.selectChecked[0].sale
        console.log(event.target.value)
        this.setState({sale: summ.toFixed(3)})
    }

    saleFunc = (event) => {
        let summ = event.target.value * this.state.selectChecked[0].buy
        console.log(event.target.value)
        this.setState({buy: summ.toFixed(3)})
    }
    
    render() {

        return (
            <div className="CurrencyCalc">
                <p>
                    {parseFloat(this.state.selectChecked[0].buy)}&nbsp;&nbsp;
                    {this.state.selectChecked[0].ccy}&nbsp;&nbsp;
                    {parseFloat(this.state.selectChecked[0].sale)}
                </p>
                <div className="CurrencyCalc__item">
                    <p>Купить&nbsp;&nbsp;{this.state.selectChecked[0].ccy}</p>
                    <input onInput={this.buyFunc} type="number" placeholder={[`0 ${this.state.selectChecked[0].ccy}`]} />
                    <p>{this.state.sale}&nbsp;&nbsp;{this.state.selectChecked[0].base_ccy}</p>
                </div>
                <div className="CurrencyCalc__item">
                    <p>Продать&nbsp;&nbsp;{this.state.selectChecked[0].ccy}</p>
                    <input onInput={this.saleFunc} type="number" placeholder={[`0 ${this.state.selectChecked[0].ccy}`]} />
                    <p>{this.state.buy}&nbsp;&nbsp;{this.state.selectChecked[0].base_ccy}</p>
                </div>
            </div>
        )
    }   
}

export default CurrencyCalc;