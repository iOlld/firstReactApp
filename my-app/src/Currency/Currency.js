import React from 'react';
import './Currency.scss';

class Currency extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
  
      }

      this.currency();
    }


    
    currency = () => {

        fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json`)
        // fetch(`https://api.privatbank.ua/p24api/exchange_rates?json&date=13.03.2020`)
            .then( (data) => {
                return data.json()
            } )
            .then( (data) => {
                console.log(data)
            } )
            .catch( () => {
                // errror
            } )

    }

    render() {
        return (
            <div className="Currency">
                Currency
            </div>
        )
    }   
}

export default Currency;