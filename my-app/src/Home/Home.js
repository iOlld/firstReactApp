import React from 'react';
import './Home.scss';

class Home extends React.Component {
    // constructor (props) {
    //   super(props);
    //   this.state = {
  
    //   }
    // }
    render() {
        return (
            <div className="Home">
                <div className="Home__bg"></div>
                <div className="container">
                    <div className="item__left">
                        <p>Согласен, так себе дизайнер, но стараюсь как могу</p>
                    </div>
                    <div className="item__right">
                        <p>Описаниие для погоды</p>
                    </div>
                    <div className="item__left">
                        {/* <p>Описаниие для курса валют</p> */}
                        <p>
                            Курс от "приват банка"
                        </p>
                    </div>
                </div>
            </div>
        )
    }   
}

export default Home;