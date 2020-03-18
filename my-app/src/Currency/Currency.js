import React from 'react';
import './Currency.scss';

class Currency extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        data: '',
        dataAll: '',
        result: '',
        select: '',
        selectResult: '',
      }

      this.baseCyrrency = ['EUR', 'USD', 'RUR'];

      this.currency();
      this.currencyAll();
    //   this.currency2();
    //   this.currency3();
    //   this.currency4();
    }


    
    currency = () => {

        fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
            .then( (data) => {
                // console.log(data.json())
                return data.json()
            } )
            .then( (data) => {
                // console.log(data)
                this.setState({data: data});

                let result = data.filter( (element) => {
                    return this.baseCyrrency.indexOf(element.ccy) !== -1;
                } )

                this.setState({result: result})
                
                this.show();
            } )

    }



    
    currencyAll = () => {

        fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=4`)
            .then( (data) => {
                // console.log(data.json())
                return data.json()
            } )
            .then( (data) => {

                let all = this.state.data.concat(data);

                // let cod = all.map( element => element.ccy );
                // console.log(cod)

                // let res = Array.from((new Set(cod)))
                // console.log(res)


                console.log(all)
                this.setState({dataAll: all});
                
                this.showAll();
            } )

    }
    
    selectFunc = (event) => {
        // console.log(event.target.value);
        let res = this.state.dataAll.filter( (element) => {

            return event.target.value === element.ccy
        } )


        this.setState({selectResult: res})
        console.log(res)
    }

    show = () => {
        console.log(this.state.data);
        console.log(this.state.result);
        // console.log(this.state.selectResult);
    }

    showAll = () => {
        console.log(this.state.dataAll);
        // console.log(parseFloat(this.state.result[0].buy));
        // console.log(this.state.selectResult);
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
                                            &nbsp;{parseFloat(this.state.result[keyName].buy)}&nbsp;
                                            {this.state.result[keyName].ccy}
                                            &nbsp;{parseFloat(this.state.result[keyName].sale)}&nbsp;
                                        </p>
                                    </div>
                                )
                            } )}
                        </div>
                        
                        <div className="sylect__currency-wrap">
                            <select onChange={this.selectFunc} className="select__currency" defaultValue={this.state.select} name="select">
                                <option value="" disabled>Выберите валюту</option>
                                {Object.keys(this.state.dataAll).map( (element) => {
                                    return <option key={element} value={this.state.dataAll[element].ccy} >{this.state.dataAll[element].ccy}</option>
                                } )}
                            </select>
                            {this.state.selectResult && <p>
                                {parseFloat(this.state.selectResult[0].buy)}&nbsp;
                                {this.state.selectResult[0].ccy}&nbsp;
                                {parseFloat(this.state.selectResult[0].sale)}
                            </p> }
                        </div>

                    </div>
                </div>
            </div>
        )
    }   
}

export default Currency;