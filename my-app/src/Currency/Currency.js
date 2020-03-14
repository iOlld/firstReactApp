import React from 'react';
import './Currency.scss';

class Currency extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        data: '',
        result: '',
        select: '',
        selectResult: '',
      }

      this.baseCyrrency = ['EUR', 'USD', 'RUB', 'PHP'];

      this.currency();
    //   this.currency2();
    //   this.currency3();
    //   this.currency4();
    }


    
    currency = () => {

        fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json`)
            .then( (data) => {
                // console.log(data.json())
                return data.json()
            } )
            .then( (data) => {
                // console.log(data)
                this.setState({data: data});

                let result = data.filter( (element) => {
                    return this.baseCyrrency.indexOf(element.cc) !== -1;
                } )

                this.setState({result: result})
                
                // this.showAllData();
            } )

    }

    selectFunc = (event) => {
        // console.log(event.target.value);
        let res = this.state.data.filter( (element) => {

            return event.target.value === element.cc
        } )


        this.setState({selectResult: res})
        // console.log(res)
    }

    // showAllData = () => {
    //     console.log(this.state.data);
    //     console.log(this.state.result);
    //     // console.log(this.state.selectResult);
    // }
    
    
    render() {
        return (
            <div className="Currency">
                <div className="container">
                    <div className="Currency__wrap">
                        <p>
                            Самый официальный курс от "Нацбанка" и все такое но если честно то их хрен 
                            поймешь на какой это день, это курс покупки или продажи, или вообще межбанк.
                            Но написано что на текущую дату, хотя они сегодня определяют курс на завтра,
                            так вот тоже хрен пойми какая у них текущая дата, а вдруг они живут на день в 
                            будущем и курс валют оставляют где-то возле столба под камнем. Короче говоря такэ шось...
                        </p>

                        <p className="base__currency" >Основные валюты</p>
                        <div className="Currency__item-wrap" >
                            {Object.keys(this.state.result).map( (keyName, i) => {
                                return (
                                    <div className="Currency__item" key={i} >
                                        <p>
                                            {this.state.result[keyName].rate}&nbsp;
                                            {this.state.result[keyName].cc}
                                        </p>
                                    </div>
                                )
                            } )}
                        </div>
                        
                        <div className="sylect__currency-wrap">
                            <select onChange={this.selectFunc} className="select__currency" defaultValue={this.state.select} name="select">
                                <option value="" disabled>Выберите валюту</option>
                                {Object.keys(this.state.data).map( (element) => {
                                    return <option key={element} value={this.state.data[element].cc} >{this.state.data[element].cc}</option>
                                } )}
                            </select>
                            {this.state.selectResult && <p>
                                {this.state.selectResult[0].txt}<br/>
                                {this.state.selectResult[0].rate}&nbsp;
                                {this.state.selectResult[0].cc}<br/>
                                {this.state.selectResult[0].exchangedate}
                            </p> }
                        </div>

                    </div>
                </div>
            </div>
        )
    }   
}

export default Currency;