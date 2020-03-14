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
                            Самый официальный курс от "Нацбанка" и все такое но если честно то их хрен 
                            поймешь на какой это день, это курс покупки или продажи, или вообще межбанк.
                            Но написано что на текущую дату, хотя они сегодня определяют курс на завтра,
                            так вот тоже хрен пойми какая у них текущая дата, а вдруг они живут на день в 
                            будущем и курс валют оставляют где-то возле столба под камнем. Короче говоря такэ шось...
                        </p>
                    </div>
                </div>
            </div>
        )
    }   
}

export default Home;